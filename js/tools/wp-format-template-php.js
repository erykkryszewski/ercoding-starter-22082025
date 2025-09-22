#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// ---- helpers ---------------------------------------------------------------

function normalizeLF(s) {
  return s.replace(/\r\n?/g, "\n");
}

// Collapse newlines/extra spaces *inside* inline PHP blocks so things like
// "$posts->\nhave_posts()" -> "$posts->have_posts()"
function collapseInlinePhpNewlines(html) {
  return html.replace(/<\?php([\s\S]*?)\?>/g, (m, inner) => {
    let s = inner;
    s = s.replace(/-\>\s*\n\s*/g, "->").replace(/::\s*\n\s*/g, "::"); // operator splits
    s = s.replace(/\s*\n\s*/g, " "); // general newline collapse
    s = s.replace(/\s{2,}/g, " "); // squeeze spaces
    return `<?php${s}?>`;
  });
}

// If an attribute value contains inline PHP, collapse whitespace/newlines inside it
function collapseInlinePhpWhitespaceInAttrs(html) {
  return html.replace(/=(["'])([^"']*<\?php[\s\S]*?\?>[^"']*)\1/g, (m, q, inner) => {
    const collapsed = inner.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ");
    return `=${q}${collapsed}${q}`;
  });
}

// Make multi-line attribute lists one line when short enough
function collapseMultilineAttributes(html, maxLen = 240) {
  return html.replace(/<([a-zA-Z][\w:-]*)(\s+[^>]*?)>/g, (m, tag, attrs) => {
    if (!/\n/.test(attrs)) return m;
    const oneLine = `<${tag}${attrs.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ")}>`;
    return oneLine.length <= maxLen ? oneLine : m;
  });
}

// ---- main ------------------------------------------------------------------

async function loadPrettier() {
  // Prettier 3 is ESM; dynamic import from CJS
  // eslint-disable-next-line no-eval
  return (await eval("import('prettier')")).default;
}

(async () => {
  const file = process.argv[2];
  if (!file) {
    console.error("Missing file path");
    process.exit(2);
  }
  const abs = path.resolve(file);
  const raw = fs.readFileSync(abs, "utf8");

  const prettier = await loadPrettier();

  let preamble = "";
  let body = raw;

  // Split a single *leading* PHP block (variables/config) from the rest (HTML+inline PHP)
  if (raw.startsWith("<?php")) {
    const end = raw.indexOf("?>");
    if (end !== -1) {
      preamble = raw.slice(0, end + 2);
      body = raw.slice(end + 2);
    }
  }

  let out = "";

  // Format the preamble with PHP parser and add exactly one blank line after it
  if (preamble) {
    const fmtPhp = await prettier.format(normalizeLF(preamble), {
      parser: "php",
      plugins: [require.resolve("@prettier/plugin-php")],
      printWidth: 100,
      tabWidth: 2,
    });
    out += fmtPhp.trimEnd() + "\n\n";
  }

  if (body) {
    // Trim leading whitespace so the gap after preamble is clean
    let html = normalizeLF(body).replace(/^\s+/, "");

    // Pre-fixers to enforce your oneliner style before Prettier runs
    html = collapseInlinePhpNewlines(html);
    html = collapseInlinePhpWhitespaceInAttrs(html);
    html = collapseMultilineAttributes(html, 240); // bump to 10000 if you want truly always-one-line

    const fmtHtml = await prettier.format(html, {
      parser: "html",
      embeddedLanguageFormatting: "off", // do not touch inline PHP blocks
      htmlWhitespaceSensitivity: "ignore",
      printWidth: 240,
      tabWidth: 2,
    });

    out += fmtHtml;
  }

  fs.writeFileSync(abs, out, "utf8");
})().catch((e) => {
  console.error(e?.message || e);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * WP template PHP formatter:
 * - If the file starts with a PHP block, format that block with Prettier's PHP parser.
 * - Format the remaining content as HTML with embedded formatting DISABLED
 *   so inline PHP one-liners in attributes stay on one line.
 *
 * Usage: node js/tools/wp-format-template-php.js path/to/file.php
 */
const fs = require("fs");
const path = require("path");

async function loadPrettier() {
  // Prettier 3 is ESM; use dynamic import from CJS
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
  let src = fs.readFileSync(abs, "utf8");

  const prettier = await loadPrettier();

  // Detect a leading PHP block (preamble) ONLY at the very top
  // e.g. "<?php ... ?>" possibly followed by whitespace/newlines before HTML.
  let preamble = "";
  let body = src;

  if (src.startsWith("<?php")) {
    const end = src.indexOf("?>");
    if (end !== -1) {
      preamble = src.slice(0, end + 2); // include "?>"
      body = src.slice(end + 2); // remainder (HTML+inline PHP)
    }
  }

  // Normalize line endings to \n
  const normalize = (s) => s.replace(/\r\n?/g, "\n");

  let out = "";

  if (preamble) {
    const fmtPhp = await prettier.format(normalize(preamble), {
      parser: "php",
      plugins: [require.resolve("@prettier/plugin-php")],
      printWidth: 100,
      tabWidth: 2,
    });
    out += fmtPhp.trimEnd() + "\n";
  }

  if (body) {
    const fmtHtml = await prettier.format(normalize(body), {
      parser: "html",
      // keep inline PHP intact; do not reformat embedded code
      embeddedLanguageFormatting: "off",
      htmlWhitespaceSensitivity: "ignore",
      // make attribute lines MUCH less likely to wrap
      printWidth: 200,
      tabWidth: 2,
    });
    // If we had a preamble, ensure a single blank line before HTML when appropriate
    if (preamble && !/^\s*</.test(fmtHtml)) out += "\n";
    out += fmtHtml.trimStart();
  }

  fs.writeFileSync(abs, out, "utf8");
})();

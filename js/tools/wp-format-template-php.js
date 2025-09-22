#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

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
  const normalize = (s) => s.replace(/\r\n?/g, "\n");

  let preamble = "";
  let body = raw;

  // Detect a single *leading* PHP block and split
  if (raw.startsWith("<?php")) {
    const end = raw.indexOf("?>");
    if (end !== -1) {
      preamble = raw.slice(0, end + 2);
      body = raw.slice(end + 2);
    }
  }

  let out = "";

  if (preamble) {
    const fmtPhp = await prettier.format(normalize(preamble), {
      parser: "php",
      plugins: [require.resolve("@prettier/plugin-php")],
      printWidth: 100,
      tabWidth: 2,
    });

    // CHANGE: ensure exactly ONE empty line after the preamble
    out += fmtPhp.trimEnd() + "\n\n"; // <-- one blank line gap (your “margin-bottom”)
  }

  if (body) {
    // NEW: trim leading whitespace so the gap above is clean & stable
    const bodyClean = normalize(body).replace(/^\s+/, "");

    const fmtHtml = await prettier.format(bodyClean, {
      parser: "html",
      embeddedLanguageFormatting: "off",
      htmlWhitespaceSensitivity: "ignore",
      printWidth: 200, // keeps <a ...> on one line unless truly huge
      tabWidth: 2,
    });

    out += fmtHtml;
  }

  fs.writeFileSync(abs, out, "utf8");
})();

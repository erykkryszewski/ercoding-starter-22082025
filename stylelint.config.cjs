module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recommended-scss"],
  plugins: ["stylelint-scss", "stylelint-order"],
  rules: {
    // Your screenshot look = blank line between rule groups:
    "rule-empty-line-before": [
      "always-multi-line",
      { except: ["first-nested"], ignore: ["after-comment"] }
    ],
    "block-closing-brace-empty-line-before": null,
    "declaration-empty-line-before": null,

    // Optional ordering (tweak as you like)
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "rules",
      "at-rules"
    ]
  },
  overrides: [{ files: ["**/*.scss"], customSyntax: "postcss-scss" }],
  ignoreFiles: ["**/node_modules/**", "**/vendor/**", "**/*.min.css"]
};

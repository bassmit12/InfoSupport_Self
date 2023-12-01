// i18n-scanner.config.js
module.exports = {
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  output: "./public/i18n/",
  options: {
    debug: true,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: ["t", "i18next.t", "i18n.t", "useTranslation"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    lngs: ["en", "nl"], // Add more language codes if needed
    defaultLng: "en",
    resource: {
      loadPath: "./public/i18n/{{lng}}/{{ns}}.json",
      savePath: "./{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    ns: ["common", "menu"], // Add your namespaces here
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
};

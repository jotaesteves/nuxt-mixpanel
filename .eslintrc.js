module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "no-console": "off",
    "no-unused-vars": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "vue/multi-word-component-names": "off",
  },
  overrides: [
    {
      files: ["test/**/*.js", "**/*.test.js", "**/*.spec.js"],
      env: {
        jest: true,
      },
      rules: {
        "no-undef": "off",
      },
    },
    {
      files: ["types/**/*.d.ts"],
      parser: "@typescript-eslint/parser",
      rules: {
        "no-unused-vars": "off",
      },
    },
    {
      files: ["examples/**/*.js"],
      rules: {
        "no-undef": "off",
        "no-unused-vars": "off",
      },
    },
  ],
};

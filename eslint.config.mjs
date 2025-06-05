import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

/** @type {import("eslint").Linter.Config} */
export default [
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    ignores: [".*.js"],
  },
];

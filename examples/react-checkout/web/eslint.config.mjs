import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import nextJsConfig from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";

/** @type {import("eslint").Linter.Config} */
export default [
  js.configs.recommended,
  prettierConfig,
  nextJsConfig.flatConfig.recommended,
  {
    plugins: {
      typescriptEslint,
    },
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: [".*.js", ".next/**", "out/**", "public/**"],
  },
];

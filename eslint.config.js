import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...jsxA11y.flatConfigs.recommended,
      react.configs.flat["jsx-runtime"],
      ...pluginRouter.configs["recommended"],
      ...pluginQuery.configs["recommended"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        project: "./tsconfig.json",
        typescript: true,
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    plugins: {
      react,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "@tanstack/query": pluginQuery,
      "@tanstack/router": pluginRouter,
    },
    rules: {
      //base rules
      "no-console": "warn",
      "no-unused-vars": "off",
      // React rules
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      // import rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      // react refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // TanStack Query
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/prefer-query-object-syntax": "warn",

      // TanStack Router
      "@tanstack/router/no-missing-route-components": "error",
    },
  },
  // Prettier config should be last
  {
    files: ["**/*.{ts,tsx}"],
    extends: ["eslint-config-prettier"],
  },
);

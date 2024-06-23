import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import globals from "globals";
import babelParser from "babel-eslint";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends("eslint:recommended", "plugin:react/recommended")
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: babelParser,
    },

    rules: {
      strict: 0,
      "no-unused-vars": 0,
      "no-console": 1,
      "no-mixed-spaces-and-tabs": 0,
      "no-debugger": 0,
      semi: ["error", "always"],
      allowImportExportEverywhere: false,
      indent: "off",
      "react/jsx-indent": "off",
      "react/jsx-indent-props": "off",

      "comma-dangle": [
        1,
        {
          arrays: "never",
          objects: "never",
          imports: "never",
          exports: "never",
          functions: "ignore",
        },
      ],

      "react/prop-types": [2],
    },
  },
];

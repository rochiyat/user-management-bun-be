import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-undef-init': 'off',
      'no-unused-imports': 'off',
      'no-unused-expressions': 'off',
      'no-unused-labels': 'off',
    },
  },
]);

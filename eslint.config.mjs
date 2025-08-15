import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // General rules
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Add more rules as needed
    },
  },
  {
    // Disable specific rules for test files
    files: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**/*'],
    rules: {
      'testing-library/prefer-screen-queries': 'off',
      'testing-library/render-result-naming-convention': 'off',
      // Add more test-specific rule overrides as needed
    },
  },
  {
    // Rules for Next.js pages
    files: ['src/app/**/page.tsx', 'src/app/**/layout.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;

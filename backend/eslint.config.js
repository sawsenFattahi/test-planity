import parser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"], // Match TypeScript files
    ignores: ["node_modules/**", "dist/**"], // Ignore specific directories
    languageOptions: {
      parser, // Use the imported parser object
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      // Your ESLint rules
      "no-unused-vars": "warn",
    },
  },
];

export default  {
    env: {
      node: true, // Enable Node.js global variables like `module`
      es2021: true, // Use modern ECMAScript globals
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module', // Use 'module' if your code uses ES Modules
    },
    rules: {
      // Customize rules as needed
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  };
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',  // Disable for React 17+
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],  // Allow JSX in .tsx files
        },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  
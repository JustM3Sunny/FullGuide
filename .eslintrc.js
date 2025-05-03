module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2021, // Use the year directly for clarity
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // Error in production
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // Error in production
    'no-unused-expressions': ['warn', { allowShortCircuit: true, allowTernary: true }], // Prevent potentially unintended side effects
    'no-template-curly-in-string': 'warn', // Catch common errors
    'require-await': 'warn', // Ensure async functions are properly used
    'no-extra-boolean-cast': 'warn', // Avoid unnecessary boolean conversions
    'no-import-assign': 'error', // Prevent accidental modification of imported bindings
    'node/exports-style': ['error', 'module.exports'], // Enforce consistent export style
    'node/file-extension-in-import': ['error', 'always'], // Enforce file extensions in imports
    'node/no-unpublished-require': 'off', // Allow require statements for dev dependencies
    'node/no-extraneous-require': 'off', // Allow require statements for dev dependencies
    'node/no-missing-require': 'off', // Allow require statements for dev dependencies
    'node/no-unsupported-features/es-syntax': 'off', // Allow ES syntax
    'node/no-process-exit': 'off', // Allow process.exit
    'node/shebang': 'off', // Allow shebang
    'node/no-callback-literal': 'off', // Allow callback literal
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off', // Allow expressions in tests
      },
    },
  ],
};
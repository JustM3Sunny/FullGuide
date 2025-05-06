module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:node/recommended',
    'plugin:security/recommended', // Added security plugin to extends
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-expressions': [
      'warn',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-template-curly-in-string': 'warn',
    'require-await': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-import-assign': 'error',
    'node/exports-style': ['error', 'module.exports'],
    'node/file-extension-in-import': ['error', 'always'],
    'node/no-unpublished-require': 'off',
    'node/no-extraneous-require': 'off',
    'node/no-missing-require': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-process-exit': 'off',
    'node/shebang': 'off',
    'node/no-callback-literal': 'off',
    'node/prefer-global/process': 'warn', // Suggest using global process instead of require('process')
    'node/prefer-global/buffer': 'warn', // Suggest using global Buffer instead of require('buffer')
    'node/no-sync': 'warn', // Discourage synchronous operations
    // 'security/detect-object-injection': 'warn', // Detect potential object injection vulnerabilities - now handled by plugin
    // 'security/detect-possible-timing-attacks': 'warn', // Detect potential timing attacks - now handled by plugin
    'security/detect-non-literal-require': 'warn', // Added rule to detect non-literal require
    'security/detect-unsafe-regex': 'warn', // Added rule to detect unsafe regex
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  plugins: ['security'],
};
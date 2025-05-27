// the older versions were magically interpreting all the imports
// in flat config we do it explicitly
const nxPlugin = require('@nx/eslint-plugin');
const js = require('@eslint/js');
const baseConfig = require('./eslint.base.config.cjs');
const globals = require('globals');
const jsoncParser = require('jsonc-eslint-parser');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  js.configs.recommended,
  // this will spread the export blocks from the base config
  ...baseConfig,
  { plugins: { '@nx': nxPlugin } },
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
    },
  },
  // there are no overrides, all the config blocks are "flat"
  {
    files: ['*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {},
  },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
];

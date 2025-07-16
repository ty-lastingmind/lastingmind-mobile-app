import js from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query'
import { defineConfig, globalIgnores } from 'eslint/config'
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import { configs as pluginReactHooksConfigs } from 'eslint-plugin-react-hooks'
import globals from 'globals'
import { configs as tsEslintConfigs } from 'typescript-eslint'

export default defineConfig([
  globalIgnores([
    'ios',
    'android',
    '.expo',
    'tailwind.config.js',
    'package-lock.json',
    'metro.config.js',
    'babel.config.js',
  ]),
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  tsEslintConfigs.recommended,
  pluginReactHooksConfigs['recommended-latest'],
  tanstackQueryPlugin.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 0,
    },
  },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    extends: ['markdown/recommended'],
  },
  pluginImport.flatConfigs.recommended,
  {
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          project: 'tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    rules: {
      '@tanstack/query/exhaustive-deps': 'warn',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          groups: [['builtin', 'external'], 'internal', 'sibling', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            {
              // This should be added both to @linters and @strv/code-quality-tools
              pattern: '~/**',
              group: 'internal',
            },
          ],
        },
      ],
      'react/jsx-curly-brace-presence': 'warn',
    },
  },
])

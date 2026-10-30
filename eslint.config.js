import * as regexpPlugin from "eslint-plugin-regexp"
import tseslint from 'typescript-eslint'

export default [
  // types/ is hand-written and checked by `test:types`, not linted
  { ignores: ['**/builds/*', '**/scratch.js', '**/scratch.ts', '**/rollup.config.js', 'types/**', 'tests/types/**'] },
  regexpPlugin.configs['flat/recommended'],
  // typescript: parse .ts files, and lint them with the (non type-aware) recommended rules
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        // client-side globals
        self: 'readonly',
        window: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        Event: 'readonly'
      }
    },
    // custom rules setup
    rules: {
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_'
        }
      ],
      'no-empty': 'warn',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'constructor-super': 'error',
      'no-this-before-super': 'error',

      'comma-dangle': ['warn', 'only-multiline'],
      'max-nested-callbacks': ['warn', 4],
      'max-params': ['warn', 5],
      'consistent-return': 'warn',
      'no-nested-ternary': 'warn',
      'no-bitwise': 'warn',
      'no-duplicate-imports': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-multi-assign': 'error',
      'no-self-compare': 'warn',
      'no-sequences': 'warn',
      radix: 'warn',
      'no-shadow': 'error',
      'no-unmodified-loop-condition': 'warn',
      'no-use-before-define': 'warn',
      'no-irregular-whitespace': 'warn',
      'no-console': 'warn',
      'no-mixed-operators': 'off',
      'no-prototype-builtins': 'off',
      'prefer-const': 'warn',
      curly: ['warn', 'all'],
      'regexp/prefer-d': 'off',
      'regexp/no-super-linear-move': 'warn'
    }
  },
  {
    files: ['**/*.ts'],
    rules: {
      // the TS compiler handles these for .ts files
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      // we are opting-in to types gradually; `any` and @ts-nocheck are expected for now
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      // `const a = this` is used in a few places; stylistic, not worth churning now
      '@typescript-eslint/no-this-alias': 'off',
      // `interface Spacetime extends Mixins {}` merges the mixed-in methods onto the class
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
      '@typescript-eslint/no-unsafe-declaration-merging': 'off'
    }
  },
  {
    files: ['tests/**/*.ts'],
    rules: {
      'no-async-promise-executor': 'error',
      'no-promise-executor-return': 'error'
    }
  }
]

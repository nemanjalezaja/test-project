module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "import/named": "off",
    "import/no-extraneous-dependencies": "off",
    "max-len": ["error", { "code": 300 }],
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "no-restricted-syntax": ["error", "BinaryExpression[operator='in']"],
    'import/no-cycle': 0,
  },
};

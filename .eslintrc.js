module.exports = {
  extends: `htmlacademy/es6`,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: `module`
  },
  env: {
    es6: true,
    browser: true,
    commonjs: true
  },
  rules: {
    "no-undef": 0
  }
};

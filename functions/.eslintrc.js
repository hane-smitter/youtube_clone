module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "object-curly-spacing": ["error", "always"],
    "quote-props": [2, "consistent"],
    "quotes": ["error", "double"],
    "indent": "off",
    "new-cap": 0,
  },
};

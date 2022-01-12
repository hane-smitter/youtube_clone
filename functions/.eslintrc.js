module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "object-curly-spacing": ["error", "always"],
    "quote-props": [2, "consistent"],
    "quotes": ["error", "double"],
    "indent": "off",
    "new-cap": 0,
    "comma-dangle": 0,
  },
};

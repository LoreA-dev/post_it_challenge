module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
  ],
  rules: {
    "jsx-a11y/no-static-element-interactions": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-filename-extension": 0,
    "no-nested-ternary": 0,
    "linebreak-style": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/jsx-props-no-spreading": 0,
    "react/self-closing-comp": 0,
    "no-unneeded-ternary": 0,
    "react/prop-types": 0,
    "react/jsx-no-bind": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/button-has-type": 0,
    "import/prefer-default-export": 0,
    "no-unused-vars": "warn",
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};

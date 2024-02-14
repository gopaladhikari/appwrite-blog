module.exports = {
  extends: ["airbnb", "airbnb-typescript", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-restricted-exports": 0,
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
    "react/react-in-jsx-scope": 0,
  },
};

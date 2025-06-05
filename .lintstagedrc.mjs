export default {
  "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
  "!(*.{js,ts,tsx})": ["prettier --write --ignore-unknown"],
};

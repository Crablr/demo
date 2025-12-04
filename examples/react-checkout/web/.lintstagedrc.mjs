export default {
  "*.{[mc]?js,ts,tsx}": ["eslint --fix", "prettier --write"],
  "!(*.{[mc]?js,ts,tsx})": ["prettier --write --ignore-unknown"],
};

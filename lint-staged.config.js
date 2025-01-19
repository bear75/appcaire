module.exports = {
  "*": ["prettier --write --ignore-unknown"],
  "**/*.ts?(x)": [
    "eslint --fix",
    // Temporarily disabled for initial UI commit
    // 'npm run check-types'
  ],
};

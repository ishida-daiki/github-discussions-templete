require('dotenv').config();

module.exports = function (buildOptions) {
  return {
    ...buildOptions,
    define: {
      process: JSON.stringify({}),
      "process.env.GITHUB_ACCESS_TOKEN": `"${process.env.GITHUB_ACCESS_TOKEN}"`,
      "process.env.GITHUB_OWNER": `"${process.env.GITHUB_OWNER}"`,
      "process.env.GITHUB_REPO": `"${process.env.GITHUB_REPO}"`,
    },
  };
};
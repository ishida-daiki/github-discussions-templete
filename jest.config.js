module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(preact|@testing-library)/)", // 除外リストに必要なモジュールを追加
  ],
  moduleNameMapper: {
    "^react$": "preact/compat",
    "^react-dom$": "preact/compat",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

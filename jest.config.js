module.exports = {
  transform: {
    "^.+\\.(ts|tsx)?$": "babel-jest",
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
  globals: {
    "ts-jest": {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  displayName: 'github-discussions-templete',
  testEnvironment: 'jest-environment-jsdom',
};

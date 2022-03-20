const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
    collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/.yarn/**"],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: "<rootDir>/",
        }),
        "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": `<rootDir>/__mocks__/fileMock.js`,
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jsdom",
    testPathIgnorePatterns: [
        "<rootDir>/.yarn/",
        "<rootDir>/.next/",
        "<rootDir>/cypress/",
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": [
            "babel-jest",
            {
                presets: [
                    [
                        "next/babel",
                        {
                            "preset-react": {
                                runtime: "automatic",
                                importSource: "@emotion/react",
                            },
                        },
                    ],
                ],
                plugins: ["@emotion/babel-plugin"],
            },
        ],
    },
    transformIgnorePatterns: ["/.yarn/"],
    verbose: true,
    moduleDirectories: ["utils", __dirname],
    snapshotSerializers: ["@emotion/jest/serializer"],
};

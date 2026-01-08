import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@shared/(.*)$": "<rootDir>/src/shared/$1",
        "^@entities/(.*)$": "<rootDir>/src/entities/$1",
        "^@features/(.*)$": "<rootDir>/src/features/$1",
        "^@widgets/(.*)$": "<rootDir>/src/widgets/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@app/(.*)$": "<rootDir>/src/app/$1",
    },
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/index.ts",
        "!src/app/styles/**",
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

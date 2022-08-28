const nextJest = require("next/jest");

const createJestConfig = nextJest({
	rootDir: "./",
});

const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@components(.*)$": "<rootDir>/components/$1",
		"^@pages(.*)$": "<rootDir>/pages/$1",
	},
};

module.exports = createJestConfig(customJestConfig);

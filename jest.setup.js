import "@testing-library/jest-dom/extend-expect";
import { loadEnvConfig } from "@next/env";
import * as nextRouter from "next/router";
(async () => {
    jest.spyOn(global.console, "info").mockImplementation(() => jest.fn());
    const projectDir = process.cwd();
    loadEnvConfig(projectDir);
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));
})();

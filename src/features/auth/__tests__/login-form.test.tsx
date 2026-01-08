/* eslint-disable @typescript-eslint/unbound-method */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { LoginForm } from "../login/ui";

// Mock the useAuth hook
const mockLogin = jest.fn();
const mockUseAuth = jest.fn();

jest.mock("@entities/session", () => ({
    useAuth: () => mockUseAuth(),
}));

describe("LoginForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        mockUseAuth.mockReturnValue({
            login: mockLogin,
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("rendering", () => {
        it("should render user id input", () => {
            render(<LoginForm />);
            expect(
                screen.getByPlaceholderText("Enter user ID...")
            ).toBeInTheDocument();
        });

        it("should render password input", () => {
            render(<LoginForm />);
            expect(
                screen.getByPlaceholderText("Enter password...")
            ).toBeInTheDocument();
        });

        it("should render submit button", () => {
            render(<LoginForm />);
            expect(
                screen.getByRole("button", { name: "[ AUTHENTICATE ]" })
            ).toBeInTheDocument();
        });

        it("should render hint text", () => {
            render(<LoginForm />);
            expect(
                screen.getByText(/Demo credentials are admin \/ 1234/)
            ).toBeInTheDocument();
        });

        it("should render labels", () => {
            render(<LoginForm />);
            expect(screen.getByText(/USER_ID:/)).toBeInTheDocument();
            expect(screen.getByText(/PASSWORD:/)).toBeInTheDocument();
        });
    });

    describe("form interaction", () => {
        it("should update user id on input change", () => {
            render(<LoginForm />);
            const input = screen.getByPlaceholderText("Enter user ID...");

            fireEvent.change(input, { target: { value: "testuser" } });

            expect(input).toHaveValue("testuser");
        });

        it("should update password on input change", () => {
            render(<LoginForm />);
            const input = screen.getByPlaceholderText("Enter password...");

            fireEvent.change(input, { target: { value: "password123" } });

            expect(input).toHaveValue("password123");
        });

        it("should disable submit button when fields are empty", () => {
            render(<LoginForm />);
            const button = screen.getByRole("button", {
                name: "[ AUTHENTICATE ]",
            });

            expect(button).toBeDisabled();
        });

        it("should disable submit button when only user id is filled", () => {
            render(<LoginForm />);
            const userIdInput = screen.getByPlaceholderText("Enter user ID...");
            fireEvent.change(userIdInput, { target: { value: "admin" } });

            const button = screen.getByRole("button", {
                name: "[ AUTHENTICATE ]",
            });
            expect(button).toBeDisabled();
        });

        it("should enable submit button when both fields are filled", () => {
            render(<LoginForm />);
            const userIdInput = screen.getByPlaceholderText("Enter user ID...");
            const passwordInput =
                screen.getByPlaceholderText("Enter password...");

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            const button = screen.getByRole("button", {
                name: "[ AUTHENTICATE ]",
            });
            expect(button).not.toBeDisabled();
        });
    });

    describe("form submission", () => {
        it("should show authenticating message during submission", () => {
            mockLogin.mockReturnValue(true);
            render(<LoginForm />);

            const userIdInput = screen.getByPlaceholderText("Enter user ID...");
            const passwordInput =
                screen.getByPlaceholderText("Enter password...");

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            fireEvent.click(
                screen.getByRole("button", { name: "[ AUTHENTICATE ]" })
            );

            expect(
                screen.getByText(/Authenticating user.../)
            ).toBeInTheDocument();
        });

        it("should disable inputs during authentication", () => {
            mockLogin.mockReturnValue(true);
            render(<LoginForm />);

            const userIdInput = screen.getByPlaceholderText("Enter user ID...");
            const passwordInput =
                screen.getByPlaceholderText("Enter password...");

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            fireEvent.click(
                screen.getByRole("button", { name: "[ AUTHENTICATE ]" })
            );

            expect(userIdInput).toBeDisabled();
            expect(passwordInput).toBeDisabled();
        });

        it("should call login with credentials on form submit", async () => {
            mockLogin.mockReturnValue(true);
            render(<LoginForm />);

            const userIdInput = screen.getByPlaceholderText("Enter user ID...");
            const passwordInput =
                screen.getByPlaceholderText("Enter password...");

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            fireEvent.click(
                screen.getByRole("button", { name: "[ AUTHENTICATE ]" })
            );

            // Advance timers to complete the async authentication
            await act(() => {
                jest.advanceTimersByTime(1000);
                return Promise.resolve();
            });

            expect(mockLogin).toHaveBeenCalledWith("admin", "1234");
        });

        it("should redirect to home on successful login", async () => {
            mockLogin.mockReturnValue(true);
            const router = useRouter();
            const pushMock = router.push;
            render(<LoginForm />);

            const userIdInput = screen.getByPlaceholderText("Enter user ID...");
            const passwordInput =
                screen.getByPlaceholderText("Enter password...");

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            fireEvent.click(
                screen.getByRole("button", { name: "[ AUTHENTICATE ]" })
            );

            await act(() => {
                jest.advanceTimersByTime(1000);
                return Promise.resolve();
            });

            expect(pushMock).toHaveBeenCalledWith("/");
        });

        it("should show error message on failed login", async () => {
            mockLogin.mockReturnValue(false);
            render(<LoginForm />);

            const userIdInput = screen.getByPlaceholderText("Enter user ID...");
            const passwordInput =
                screen.getByPlaceholderText("Enter password...");

            fireEvent.change(userIdInput, { target: { value: "wrong" } });
            fireEvent.change(passwordInput, { target: { value: "creds" } });

            fireEvent.click(
                screen.getByRole("button", { name: "[ AUTHENTICATE ]" })
            );

            await act(() => {
                jest.advanceTimersByTime(1000);
                return Promise.resolve();
            });

            expect(
                screen.getByText("ACCESS DENIED. Invalid credentials.")
            ).toBeInTheDocument();
        });

        it("should not redirect on failed login", async () => {
            mockLogin.mockReturnValue(false);
            const router = useRouter();
            const pushMock = router.push;
            render(<LoginForm />);

            const userIdInput = screen.getByPlaceholderText("Enter user ID...");
            const passwordInput =
                screen.getByPlaceholderText("Enter password...");

            fireEvent.change(userIdInput, { target: { value: "wrong" } });
            fireEvent.change(passwordInput, { target: { value: "creds" } });

            fireEvent.click(
                screen.getByRole("button", { name: "[ AUTHENTICATE ]" })
            );

            await act(() => {
                jest.advanceTimersByTime(1000);
                return Promise.resolve();
            });

            expect(pushMock).not.toHaveBeenCalled();
        });

        it("should clear error on new submission", async () => {
            mockLogin.mockReturnValueOnce(false).mockReturnValueOnce(true);
            render(<LoginForm />);

            const userIdInput = screen.getByPlaceholderText("Enter user ID...");
            const passwordInput =
                screen.getByPlaceholderText("Enter password...");

            // First failed attempt
            fireEvent.change(userIdInput, { target: { value: "wrong" } });
            fireEvent.change(passwordInput, { target: { value: "creds" } });
            fireEvent.click(
                screen.getByRole("button", { name: "[ AUTHENTICATE ]" })
            );

            await act(() => {
                jest.advanceTimersByTime(1000);
                return Promise.resolve();
            });

            expect(
                screen.getByText("ACCESS DENIED. Invalid credentials.")
            ).toBeInTheDocument();

            // Second attempt
            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });
            fireEvent.click(
                screen.getByRole("button", { name: "[ AUTHENTICATE ]" })
            );

            // Error should be cleared
            expect(
                screen.queryByText("ACCESS DENIED. Invalid credentials.")
            ).not.toBeInTheDocument();
        });
    });
});

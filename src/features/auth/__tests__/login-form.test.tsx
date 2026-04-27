/* eslint-disable @typescript-eslint/unbound-method */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { LoginForm } from "../login/ui";

const mockLogin = jest.fn();
const mockUseAuth = jest.fn();

jest.mock("@entities/session", () => ({
    useAuth: () => mockUseAuth(),
}));

describe("LoginForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        mockUseAuth.mockReturnValue({ login: mockLogin });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("rendering", () => {
        it("should render user id input", () => {
            render(<LoginForm />);
            expect(
                screen.getByPlaceholderText("Enter your user ID")
            ).toBeInTheDocument();
        });

        it("should render password input", () => {
            render(<LoginForm />);
            expect(
                screen.getByPlaceholderText("Enter your password")
            ).toBeInTheDocument();
        });

        it("should render submit button", () => {
            render(<LoginForm />);
            expect(
                screen.getByRole("button", { name: "Sign in" })
            ).toBeInTheDocument();
        });

        it("should render hint text", () => {
            render(<LoginForm />);
            expect(screen.getByText(/Demo: admin \/ 1234/)).toBeInTheDocument();
        });

        it("should render labels", () => {
            render(<LoginForm />);
            expect(screen.getByText("User ID")).toBeInTheDocument();
            expect(screen.getByText("Password")).toBeInTheDocument();
        });
    });

    describe("form interaction", () => {
        it("should update user id on input change", () => {
            render(<LoginForm />);
            const input = screen.getByPlaceholderText("Enter your user ID");

            fireEvent.change(input, { target: { value: "testuser" } });

            expect(input).toHaveValue("testuser");
        });

        it("should update password on input change", () => {
            render(<LoginForm />);
            const input = screen.getByPlaceholderText("Enter your password");

            fireEvent.change(input, { target: { value: "password123" } });

            expect(input).toHaveValue("password123");
        });

        it("should disable submit button when fields are empty", () => {
            render(<LoginForm />);
            expect(
                screen.getByRole("button", { name: "Sign in" })
            ).toBeDisabled();
        });

        it("should disable submit button when only user id is filled", () => {
            render(<LoginForm />);
            const userIdInput =
                screen.getByPlaceholderText("Enter your user ID");
            fireEvent.change(userIdInput, { target: { value: "admin" } });

            expect(
                screen.getByRole("button", { name: "Sign in" })
            ).toBeDisabled();
        });

        it("should enable submit button when both fields are filled", () => {
            render(<LoginForm />);
            const userIdInput =
                screen.getByPlaceholderText("Enter your user ID");
            const passwordInput = screen.getByPlaceholderText(
                "Enter your password"
            );

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            expect(
                screen.getByRole("button", { name: "Sign in" })
            ).not.toBeDisabled();
        });
    });

    describe("form submission", () => {
        it("should show signing in message during submission", () => {
            mockLogin.mockReturnValue(true);
            render(<LoginForm />);

            const userIdInput =
                screen.getByPlaceholderText("Enter your user ID");
            const passwordInput = screen.getByPlaceholderText(
                "Enter your password"
            );

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

            expect(screen.getByText(/Signing in…/)).toBeInTheDocument();
        });

        it("should disable inputs during authentication", () => {
            mockLogin.mockReturnValue(true);
            render(<LoginForm />);

            const userIdInput =
                screen.getByPlaceholderText("Enter your user ID");
            const passwordInput = screen.getByPlaceholderText(
                "Enter your password"
            );

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

            expect(userIdInput).toBeDisabled();
            expect(passwordInput).toBeDisabled();
        });

        it("should call login with credentials on form submit", async () => {
            mockLogin.mockReturnValue(true);
            render(<LoginForm />);

            const userIdInput =
                screen.getByPlaceholderText("Enter your user ID");
            const passwordInput = screen.getByPlaceholderText(
                "Enter your password"
            );

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

            await act(() => {
                jest.advanceTimersByTime(600);
                return Promise.resolve();
            });

            expect(mockLogin).toHaveBeenCalledWith("admin", "1234");
        });

        it("should redirect to home on successful login", async () => {
            mockLogin.mockReturnValue(true);
            const router = useRouter();
            const pushMock = router.push;
            render(<LoginForm />);

            const userIdInput =
                screen.getByPlaceholderText("Enter your user ID");
            const passwordInput = screen.getByPlaceholderText(
                "Enter your password"
            );

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });

            fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

            await act(() => {
                jest.advanceTimersByTime(600);
                return Promise.resolve();
            });

            expect(pushMock).toHaveBeenCalledWith("/");
        });

        it("should show error message on failed login", async () => {
            mockLogin.mockReturnValue(false);
            render(<LoginForm />);

            const userIdInput =
                screen.getByPlaceholderText("Enter your user ID");
            const passwordInput = screen.getByPlaceholderText(
                "Enter your password"
            );

            fireEvent.change(userIdInput, { target: { value: "wrong" } });
            fireEvent.change(passwordInput, { target: { value: "creds" } });

            fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

            await act(() => {
                jest.advanceTimersByTime(600);
                return Promise.resolve();
            });

            expect(
                screen.getByText("Invalid credentials. Please try again.")
            ).toBeInTheDocument();
        });

        it("should not redirect on failed login", async () => {
            mockLogin.mockReturnValue(false);
            const router = useRouter();
            const pushMock = router.push;
            render(<LoginForm />);

            const userIdInput =
                screen.getByPlaceholderText("Enter your user ID");
            const passwordInput = screen.getByPlaceholderText(
                "Enter your password"
            );

            fireEvent.change(userIdInput, { target: { value: "wrong" } });
            fireEvent.change(passwordInput, { target: { value: "creds" } });

            fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

            await act(() => {
                jest.advanceTimersByTime(600);
                return Promise.resolve();
            });

            expect(pushMock).not.toHaveBeenCalled();
        });

        it("should clear error on new submission", async () => {
            mockLogin.mockReturnValueOnce(false).mockReturnValueOnce(true);
            render(<LoginForm />);

            const userIdInput =
                screen.getByPlaceholderText("Enter your user ID");
            const passwordInput = screen.getByPlaceholderText(
                "Enter your password"
            );

            fireEvent.change(userIdInput, { target: { value: "wrong" } });
            fireEvent.change(passwordInput, { target: { value: "creds" } });
            fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

            await act(() => {
                jest.advanceTimersByTime(600);
                return Promise.resolve();
            });

            expect(
                screen.getByText("Invalid credentials. Please try again.")
            ).toBeInTheDocument();

            fireEvent.change(userIdInput, { target: { value: "admin" } });
            fireEvent.change(passwordInput, { target: { value: "1234" } });
            fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

            expect(
                screen.queryByText("Invalid credentials. Please try again.")
            ).not.toBeInTheDocument();
        });
    });
});

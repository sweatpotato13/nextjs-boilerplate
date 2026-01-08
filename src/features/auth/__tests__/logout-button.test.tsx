/* eslint-disable @typescript-eslint/unbound-method */
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { LogoutButton } from "../logout/ui";

// Mock the useAuth hook
const mockLogout = jest.fn();

jest.mock("@entities/session", () => ({
    useAuth: () => ({
        logout: mockLogout,
    }),
}));

describe("LogoutButton", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render logout button with correct text", () => {
        render(<LogoutButton />);
        expect(screen.getByText("[LOGOUT]")).toBeInTheDocument();
    });

    it("should call logout when clicked", () => {
        render(<LogoutButton />);
        const button = screen.getByText("[LOGOUT]");

        fireEvent.click(button);

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it("should redirect to home after logout", () => {
        const router = useRouter();
        const pushMock = router.push;
        render(<LogoutButton />);
        const button = screen.getByText("[LOGOUT]");

        fireEvent.click(button);

        expect(pushMock).toHaveBeenCalledWith("/");
    });

    it("should call logout before redirect", () => {
        const router = useRouter();
        const callOrder: string[] = [];
        mockLogout.mockImplementation(() => callOrder.push("logout"));
        (router.push as jest.Mock).mockImplementation(() =>
            callOrder.push("push")
        );

        render(<LogoutButton />);
        const button = screen.getByText("[LOGOUT]");

        fireEvent.click(button);

        expect(callOrder).toEqual(["logout", "push"]);
    });

    it("should be a button element", () => {
        render(<LogoutButton />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});

import { render, screen } from "@testing-library/react";

import { User } from "../model";
import { UserCard } from "../ui/user-card";

describe("UserCard", () => {
    const mockUser: User = {
        id: "1",
        username: "testuser",
        email: "test@example.com",
        fullName: "Test User",
        avatarUrl: "https://example.com/avatar.jpg",
        bio: "This is a test bio",
        joinedAt: new Date("2024-01-15"),
        role: "user",
    };

    it("should render user full name", () => {
        render(<UserCard user={mockUser} />);
        expect(screen.getByText("Test User")).toBeInTheDocument();
    });

    it("should render username with @ prefix", () => {
        render(<UserCard user={mockUser} />);
        expect(screen.getByText("@testuser")).toBeInTheDocument();
    });

    it("should render avatar image when avatarUrl is provided", () => {
        render(<UserCard user={mockUser} />);
        const avatar = screen.getByAltText("Test User's avatar");
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute("src", mockUser.avatarUrl);
    });

    it("should render placeholder when avatarUrl is not provided", () => {
        const userWithoutAvatar: User = {
            ...mockUser,
            avatarUrl: undefined,
        };
        render(<UserCard user={userWithoutAvatar} />);

        // Should show first character of fullName
        expect(screen.getByText("T")).toBeInTheDocument();
        expect(
            screen.queryByAltText("Test User's avatar")
        ).not.toBeInTheDocument();
    });

    it("should render bio when provided", () => {
        render(<UserCard user={mockUser} />);
        expect(screen.getByText("This is a test bio")).toBeInTheDocument();
        expect(screen.getByText(/BIO:/)).toBeInTheDocument();
    });

    it("should not render bio section when bio is not provided", () => {
        const userWithoutBio: User = {
            ...mockUser,
            bio: undefined,
        };
        render(<UserCard user={userWithoutBio} />);
        expect(screen.queryByText(/BIO:/)).not.toBeInTheDocument();
    });

    it("should render user role badge", () => {
        render(<UserCard user={mockUser} />);
        expect(screen.getByText("USER")).toBeInTheDocument();
    });

    it("should render admin role badge for admin users", () => {
        const adminUser: User = {
            ...mockUser,
            role: "admin",
        };
        render(<UserCard user={adminUser} />);
        expect(screen.getByText("ADMIN")).toBeInTheDocument();
    });

    it("should render member since date", () => {
        render(<UserCard user={mockUser} />);
        // The date format depends on locale
        expect(screen.getByText(/Member since/)).toBeInTheDocument();
    });

    it("should render action buttons", () => {
        render(<UserCard user={mockUser} />);
        expect(screen.getByText("[EDIT]")).toBeInTheDocument();
        expect(screen.getByText("[CONTACT]")).toBeInTheDocument();
    });
});

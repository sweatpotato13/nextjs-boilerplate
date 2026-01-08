import { User } from "@entities/user";
import { fireEvent, render, screen } from "@testing-library/react";

import { UpdateProfileForm } from "../update-profile/ui";

describe("UpdateProfileForm", () => {
    const mockUser: User = {
        id: "1",
        username: "testuser",
        email: "test@example.com",
        fullName: "Test User",
        avatarUrl: "https://example.com/avatar.jpg",
        bio: "Test bio",
        joinedAt: new Date("2024-01-15"),
        role: "user",
    };

    const mockOnUpdateProfile = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the header", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        expect(screen.getByText(/EDIT_PROFILE:/)).toBeInTheDocument();
    });

    it("should render full name input with initial value", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const input = screen.getByDisplayValue("Test User");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("name", "fullName");
    });

    it("should render avatar URL input with initial value", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const input = screen.getByDisplayValue(
            "https://example.com/avatar.jpg"
        );
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("name", "avatarUrl");
    });

    it("should render bio textarea with initial value", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const textarea = screen.getByDisplayValue("Test bio");
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveAttribute("name", "bio");
    });

    it("should render save button", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        expect(
            screen.getByRole("button", { name: "[SAVE]" })
        ).toBeInTheDocument();
    });

    it("should render labels", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        expect(screen.getByText("Full Name:")).toBeInTheDocument();
        expect(screen.getByText("Avatar URL:")).toBeInTheDocument();
        expect(screen.getByText("Bio:")).toBeInTheDocument();
    });

    it("should update full name on input change", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const input = screen.getByDisplayValue("Test User");

        fireEvent.change(input, { target: { value: "New Name" } });

        expect(screen.getByDisplayValue("New Name")).toBeInTheDocument();
    });

    it("should update avatar URL on input change", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const input = screen.getByDisplayValue(
            "https://example.com/avatar.jpg"
        );

        fireEvent.change(input, {
            target: { value: "https://new-avatar.com/img.png" },
        });

        expect(
            screen.getByDisplayValue("https://new-avatar.com/img.png")
        ).toBeInTheDocument();
    });

    it("should update bio on textarea change", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const textarea = screen.getByDisplayValue("Test bio");

        fireEvent.change(textarea, { target: { value: "New bio content" } });

        expect(screen.getByDisplayValue("New bio content")).toBeInTheDocument();
    });

    it("should call onUpdateProfile with form data on submit", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );

        const fullNameInput = screen.getByDisplayValue("Test User");
        const bioTextarea = screen.getByDisplayValue("Test bio");

        fireEvent.change(fullNameInput, { target: { value: "Updated Name" } });
        fireEvent.change(bioTextarea, { target: { value: "Updated bio" } });

        fireEvent.click(screen.getByRole("button", { name: "[SAVE]" }));

        expect(mockOnUpdateProfile).toHaveBeenCalledWith({
            fullName: "Updated Name",
            bio: "Updated bio",
            avatarUrl: "https://example.com/avatar.jpg",
        });
    });

    it("should show avatar preview when avatarUrl is provided", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const preview = screen.getByAltText("Avatar preview");
        expect(preview).toBeInTheDocument();
    });

    it("should not show avatar preview when avatarUrl is empty", () => {
        const userWithoutAvatar = { ...mockUser, avatarUrl: "" };
        render(
            <UpdateProfileForm
                user={userWithoutAvatar}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        expect(screen.queryByAltText("Avatar preview")).not.toBeInTheDocument();
    });

    it("should handle user without bio", () => {
        const userWithoutBio = { ...mockUser, bio: undefined };
        render(
            <UpdateProfileForm
                user={userWithoutBio}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const textarea = screen.getByPlaceholderText(
            "Tell us about yourself..."
        );
        expect(textarea).toHaveValue("");
    });

    it("should handle user without avatarUrl", () => {
        const userWithoutAvatar = { ...mockUser, avatarUrl: undefined };
        render(
            <UpdateProfileForm
                user={userWithoutAvatar}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const input = screen.getByPlaceholderText(
            "https://example.com/avatar.jpg"
        );
        expect(input).toHaveValue("");
    });

    it("should require full name", () => {
        render(
            <UpdateProfileForm
                user={mockUser}
                onUpdateProfile={mockOnUpdateProfile}
            />
        );
        const input = screen.getByDisplayValue("Test User");
        expect(input).toHaveAttribute("required");
    });
});

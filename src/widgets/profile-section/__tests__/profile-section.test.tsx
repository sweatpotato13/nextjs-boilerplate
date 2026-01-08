import { fireEvent, render, screen } from "@testing-library/react";

import { ProfileSection } from "../ui";

// Mock the entity modules
jest.mock("@entities/user", () => ({
    mockUser: {
        id: "1",
        username: "john_doe",
        email: "john@example.com",
        fullName: "John Doe",
        avatarUrl: "https://example.com/avatar.jpg",
        bio: "Test bio",
        joinedAt: new Date("2024-01-15"),
        role: "user",
    },
    mockUserStats: {
        tasksDone: 42,
        tasksCreated: 58,
        lastActive: new Date("2024-01-15"),
    },
    UserCard: ({ user }: { user: { fullName: string; username: string } }) => (
        <div data-testid="user-card">
            <span>{user.fullName}</span>
            <span>@{user.username}</span>
        </div>
    ),
    UserStatsCard: ({
        stats,
    }: {
        stats: { tasksDone: number; tasksCreated: number };
    }) => (
        <div data-testid="user-stats">
            <span>Done: {stats.tasksDone}</span>
            <span>Created: {stats.tasksCreated}</span>
        </div>
    ),
}));

// Mock UpdateProfileForm
jest.mock("@features/user-settings", () => ({
    UpdateProfileForm: ({
        user,
        onUpdateProfile,
    }: {
        user: { fullName: string };
        onUpdateProfile: (data: { fullName: string }) => void;
    }) => (
        <div data-testid="update-form">
            <span>Editing: {user.fullName}</span>
            <button
                onClick={() => onUpdateProfile({ fullName: "Updated Name" })}
            >
                Save
            </button>
        </div>
    ),
}));

describe("ProfileSection", () => {
    it("should render the header", () => {
        render(<ProfileSection />);
        expect(screen.getByText(/USER_DATA:/)).toBeInTheDocument();
    });

    it("should render edit button", () => {
        render(<ProfileSection />);
        expect(screen.getByText("[EDIT]")).toBeInTheDocument();
    });

    it("should render UserCard by default", () => {
        render(<ProfileSection />);
        expect(screen.getByTestId("user-card")).toBeInTheDocument();
    });

    it("should render UserStatsCard", () => {
        render(<ProfileSection />);
        expect(screen.getByTestId("user-stats")).toBeInTheDocument();
    });

    it("should switch to edit mode when edit button is clicked", () => {
        render(<ProfileSection />);

        fireEvent.click(screen.getByText("[EDIT]"));

        expect(screen.getByTestId("update-form")).toBeInTheDocument();
        expect(screen.queryByTestId("user-card")).not.toBeInTheDocument();
    });

    it("should show cancel button in edit mode", () => {
        render(<ProfileSection />);

        fireEvent.click(screen.getByText("[EDIT]"));

        expect(screen.getByText("[CANCEL]")).toBeInTheDocument();
    });

    it("should exit edit mode when cancel is clicked", () => {
        render(<ProfileSection />);

        fireEvent.click(screen.getByText("[EDIT]"));
        expect(screen.getByTestId("update-form")).toBeInTheDocument();

        fireEvent.click(screen.getByText("[CANCEL]"));
        expect(screen.getByTestId("user-card")).toBeInTheDocument();
        expect(screen.queryByTestId("update-form")).not.toBeInTheDocument();
    });

    it("should update user and exit edit mode on form submit", () => {
        render(<ProfileSection />);

        fireEvent.click(screen.getByText("[EDIT]"));
        fireEvent.click(screen.getByText("Save"));

        expect(screen.getByTestId("user-card")).toBeInTheDocument();
        expect(screen.queryByTestId("update-form")).not.toBeInTheDocument();
    });

    it("should display user stats with correct data", () => {
        render(<ProfileSection />);

        expect(screen.getByText("Done: 42")).toBeInTheDocument();
        expect(screen.getByText("Created: 58")).toBeInTheDocument();
    });

    it("should toggle between edit and view mode multiple times", () => {
        render(<ProfileSection />);

        // First toggle to edit
        fireEvent.click(screen.getByText("[EDIT]"));
        expect(screen.getByTestId("update-form")).toBeInTheDocument();

        // Toggle back to view
        fireEvent.click(screen.getByText("[CANCEL]"));
        expect(screen.getByTestId("user-card")).toBeInTheDocument();

        // Toggle to edit again
        fireEvent.click(screen.getByText("[EDIT]"));
        expect(screen.getByTestId("update-form")).toBeInTheDocument();
    });
});

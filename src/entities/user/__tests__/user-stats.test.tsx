import { render, screen } from "@testing-library/react";

import { UserStats } from "../model";
import { UserStatsCard } from "../ui/user-stats";

describe("UserStatsCard", () => {
    const mockStats: UserStats = {
        tasksDone: 42,
        tasksCreated: 58,
        lastActive: new Date("2024-01-15T10:30:00"),
    };

    it("should render the header", () => {
        render(<UserStatsCard stats={mockStats} />);
        expect(screen.getByText(/ACTIVITY_STATS:/)).toBeInTheDocument();
    });

    it("should display tasks completed count", () => {
        render(<UserStatsCard stats={mockStats} />);
        expect(screen.getByText("Tasks Completed")).toBeInTheDocument();
        expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("should display tasks created count", () => {
        render(<UserStatsCard stats={mockStats} />);
        expect(screen.getByText("Tasks Created")).toBeInTheDocument();
        expect(screen.getByText("58")).toBeInTheDocument();
    });

    it("should display last activity timestamp", () => {
        render(<UserStatsCard stats={mockStats} />);
        expect(screen.getByText(/Last activity:/)).toBeInTheDocument();
    });

    it("should render with zero stats", () => {
        const zeroStats: UserStats = {
            tasksDone: 0,
            tasksCreated: 0,
            lastActive: new Date(),
        };
        render(<UserStatsCard stats={zeroStats} />);
        expect(screen.getAllByText("0")).toHaveLength(2);
    });

    it("should render with large numbers", () => {
        const largeStats: UserStats = {
            tasksDone: 9999,
            tasksCreated: 12345,
            lastActive: new Date(),
        };
        render(<UserStatsCard stats={largeStats} />);
        expect(screen.getByText("9999")).toBeInTheDocument();
        expect(screen.getByText("12345")).toBeInTheDocument();
    });
});

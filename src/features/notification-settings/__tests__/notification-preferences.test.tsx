import { fireEvent, render, screen } from "@testing-library/react";

import { NotificationPreferences } from "../ui";

if (typeof globalThis.PointerEvent === "undefined") {
    globalThis.PointerEvent = MouseEvent as typeof PointerEvent;
}

describe("NotificationPreferences", () => {
    it("should render the header", () => {
        render(<NotificationPreferences />);
        expect(
            screen.getByText("Notification preferences")
        ).toBeInTheDocument();
    });

    it("should render all notification options", () => {
        render(<NotificationPreferences />);

        expect(screen.getByText("Email Notifications")).toBeInTheDocument();
        expect(screen.getByText("Push Notifications")).toBeInTheDocument();
        expect(screen.getByText("Task Reminders")).toBeInTheDocument();
        expect(screen.getByText("Marketing Emails")).toBeInTheDocument();
    });

    it("should render correct number of toggle switches", () => {
        render(<NotificationPreferences />);
        const switches = screen.getAllByRole("switch");
        expect(switches).toHaveLength(4);
    });

    it("should have correct initial toggle states", () => {
        render(<NotificationPreferences />);
        const switches = screen.getAllByRole("switch");

        // email: true, push: true, taskReminders: true, marketingEmails: false
        expect(switches[0]).toHaveAttribute("aria-checked", "true");
        expect(switches[1]).toHaveAttribute("aria-checked", "true");
        expect(switches[2]).toHaveAttribute("aria-checked", "true");
        expect(switches[3]).toHaveAttribute("aria-checked", "false");
    });

    it("should toggle email notifications", () => {
        render(<NotificationPreferences />);
        const emailCheckbox = screen.getAllByRole("switch")[0];

        expect(emailCheckbox).toHaveAttribute("aria-checked", "true");

        fireEvent.pointerDown(emailCheckbox);
        fireEvent.click(emailCheckbox);
        expect(emailCheckbox).toHaveAttribute("aria-checked", "false");

        fireEvent.click(emailCheckbox);
        expect(emailCheckbox).toHaveAttribute("aria-checked", "true");
    });

    it("should toggle push notifications", () => {
        render(<NotificationPreferences />);
        const pushCheckbox = screen.getAllByRole("switch")[1];

        expect(pushCheckbox).toHaveAttribute("aria-checked", "true");
        fireEvent.pointerDown(pushCheckbox);
        fireEvent.click(pushCheckbox);
        expect(pushCheckbox).toHaveAttribute("aria-checked", "false");
    });

    it("should toggle task reminders", () => {
        render(<NotificationPreferences />);
        const taskCheckbox = screen.getAllByRole("switch")[2];

        expect(taskCheckbox).toHaveAttribute("aria-checked", "true");
        fireEvent.pointerDown(taskCheckbox);
        fireEvent.click(taskCheckbox);
        expect(taskCheckbox).toHaveAttribute("aria-checked", "false");
    });

    it("should toggle marketing emails", () => {
        render(<NotificationPreferences />);
        const marketingCheckbox = screen.getAllByRole("switch")[3];

        expect(marketingCheckbox).toHaveAttribute("aria-checked", "false");
        fireEvent.pointerDown(marketingCheckbox);
        fireEvent.click(marketingCheckbox);
        expect(marketingCheckbox).toHaveAttribute("aria-checked", "true");
    });

    it("should display auto-saved badge", () => {
        render(<NotificationPreferences />);
        expect(screen.getByText("Auto-saved")).toBeInTheDocument();
    });

    it("should maintain independent toggle states", () => {
        render(<NotificationPreferences />);
        const checkboxes = screen.getAllByRole("switch");

        // Toggle all checkboxes
        checkboxes.forEach(checkbox => {
            fireEvent.pointerDown(checkbox);
            fireEvent.click(checkbox);
        });

        // Verify states are inverted
        expect(checkboxes[0]).toHaveAttribute("aria-checked", "false");
        expect(checkboxes[1]).toHaveAttribute("aria-checked", "false");
        expect(checkboxes[2]).toHaveAttribute("aria-checked", "false");
        expect(checkboxes[3]).toHaveAttribute("aria-checked", "true");
    });
});

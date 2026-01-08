import { fireEvent, render, screen } from "@testing-library/react";

import { NotificationPreferences } from "../ui";

describe("NotificationPreferences", () => {
    it("should render the header", () => {
        render(<NotificationPreferences />);
        expect(screen.getByText(/NOTIFICATION_SETTINGS:/)).toBeInTheDocument();
    });

    it("should render all notification options", () => {
        render(<NotificationPreferences />);

        expect(screen.getByText("Email Notifications")).toBeInTheDocument();
        expect(screen.getByText("Push Notifications")).toBeInTheDocument();
        expect(screen.getByText("Task Reminders")).toBeInTheDocument();
        expect(screen.getByText("Marketing Emails")).toBeInTheDocument();
    });

    it("should render correct number of toggle checkboxes", () => {
        render(<NotificationPreferences />);
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(4);
    });

    it("should have correct initial toggle states", () => {
        render(<NotificationPreferences />);
        const checkboxes = screen.getAllByRole("checkbox");

        // email: true, push: true, taskReminders: true, marketingEmails: false
        expect(checkboxes[0]).toBeChecked(); // Email
        expect(checkboxes[1]).toBeChecked(); // Push
        expect(checkboxes[2]).toBeChecked(); // Task Reminders
        expect(checkboxes[3]).not.toBeChecked(); // Marketing
    });

    it("should toggle email notifications", () => {
        render(<NotificationPreferences />);
        const emailCheckbox = screen.getAllByRole("checkbox")[0];

        expect(emailCheckbox).toBeChecked();

        fireEvent.click(emailCheckbox);
        expect(emailCheckbox).not.toBeChecked();

        fireEvent.click(emailCheckbox);
        expect(emailCheckbox).toBeChecked();
    });

    it("should toggle push notifications", () => {
        render(<NotificationPreferences />);
        const pushCheckbox = screen.getAllByRole("checkbox")[1];

        expect(pushCheckbox).toBeChecked();
        fireEvent.click(pushCheckbox);
        expect(pushCheckbox).not.toBeChecked();
    });

    it("should toggle task reminders", () => {
        render(<NotificationPreferences />);
        const taskCheckbox = screen.getAllByRole("checkbox")[2];

        expect(taskCheckbox).toBeChecked();
        fireEvent.click(taskCheckbox);
        expect(taskCheckbox).not.toBeChecked();
    });

    it("should toggle marketing emails", () => {
        render(<NotificationPreferences />);
        const marketingCheckbox = screen.getAllByRole("checkbox")[3];

        expect(marketingCheckbox).not.toBeChecked();
        fireEvent.click(marketingCheckbox);
        expect(marketingCheckbox).toBeChecked();
    });

    it("should display auto-saved badge", () => {
        render(<NotificationPreferences />);
        expect(screen.getByText("Auto-saved")).toBeInTheDocument();
    });

    it("should maintain independent toggle states", () => {
        render(<NotificationPreferences />);
        const checkboxes = screen.getAllByRole("checkbox");

        // Toggle all checkboxes
        checkboxes.forEach(checkbox => fireEvent.click(checkbox));

        // Verify states are inverted
        expect(checkboxes[0]).not.toBeChecked(); // Email was true, now false
        expect(checkboxes[1]).not.toBeChecked(); // Push was true, now false
        expect(checkboxes[2]).not.toBeChecked(); // Task was true, now false
        expect(checkboxes[3]).toBeChecked(); // Marketing was false, now true
    });
});

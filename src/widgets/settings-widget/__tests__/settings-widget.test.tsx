import { fireEvent, render, screen } from "@testing-library/react";

import { SettingsWidget } from "../ui";

// Mock the feature modules
jest.mock("@features/notification-settings", () => ({
    NotificationPreferences: () => (
        <div data-testid="notification-preferences">Notification Settings</div>
    ),
}));

jest.mock("@features/theme-switcher", () => ({
    ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>,
}));

describe("SettingsWidget", () => {
    it("should render the header", () => {
        render(<SettingsWidget />);
        expect(screen.getByText(/CONFIG_OPTIONS:/)).toBeInTheDocument();
    });

    it("should render general tab button", () => {
        render(<SettingsWidget />);
        expect(screen.getByText(/GENERAL/)).toBeInTheDocument();
    });

    it("should render notifications tab button", () => {
        render(<SettingsWidget />);
        expect(screen.getByText(/NOTIFICATIONS/)).toBeInTheDocument();
    });

    it("should show general tab content by default", () => {
        render(<SettingsWidget />);
        expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
    });

    it("should show language selector in general tab", () => {
        render(<SettingsWidget />);
        expect(screen.getByText(/LANGUAGE:/)).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should have correct language options", () => {
        render(<SettingsWidget />);
        const select = screen.getByRole("combobox");

        expect(select).toContainElement(screen.getByText("English"));
        expect(select).toContainElement(screen.getByText("French"));
        expect(select).toContainElement(screen.getByText("Spanish"));
        expect(select).toContainElement(screen.getByText("German"));
        expect(select).toContainElement(screen.getByText("Korean"));
    });

    it("should switch to notifications tab when clicked", () => {
        render(<SettingsWidget />);

        fireEvent.click(screen.getByText(/NOTIFICATIONS/));

        expect(
            screen.getByTestId("notification-preferences")
        ).toBeInTheDocument();
        expect(screen.queryByTestId("theme-switcher")).not.toBeInTheDocument();
    });

    it("should switch back to general tab when clicked", () => {
        render(<SettingsWidget />);

        // Go to notifications
        fireEvent.click(screen.getByText(/NOTIFICATIONS/));
        expect(
            screen.getByTestId("notification-preferences")
        ).toBeInTheDocument();

        // Go back to general
        fireEvent.click(screen.getByText(/GENERAL/));
        expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
        expect(
            screen.queryByTestId("notification-preferences")
        ).not.toBeInTheDocument();
    });

    it("should highlight active tab with asterisk", () => {
        render(<SettingsWidget />);

        // General tab should be active by default
        expect(screen.getByText(/\[\*GENERAL\]/)).toBeInTheDocument();
        expect(screen.getByText(/\[ NOTIFICATIONS\]/)).toBeInTheDocument();

        // Switch to notifications
        fireEvent.click(screen.getByText(/NOTIFICATIONS/));

        expect(screen.getByText(/\[ GENERAL\]/)).toBeInTheDocument();
        expect(screen.getByText(/\[\*NOTIFICATIONS\]/)).toBeInTheDocument();
    });

    it("should not show notification settings in general tab", () => {
        render(<SettingsWidget />);
        expect(
            screen.queryByTestId("notification-preferences")
        ).not.toBeInTheDocument();
    });

    it("should not show theme switcher in notifications tab", () => {
        render(<SettingsWidget />);
        fireEvent.click(screen.getByText(/NOTIFICATIONS/));
        expect(screen.queryByTestId("theme-switcher")).not.toBeInTheDocument();
    });

    it("should not show language selector in notifications tab", () => {
        render(<SettingsWidget />);
        fireEvent.click(screen.getByText(/NOTIFICATIONS/));
        expect(screen.queryByText(/LANGUAGE:/)).not.toBeInTheDocument();
    });
});

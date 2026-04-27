import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeSwitcher } from "../ui";

describe("ThemeSwitcher", () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove("dark");
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query === "(prefers-color-scheme: dark)",
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            addListener: jest.fn(),
            removeListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })) as unknown as typeof window.matchMedia;
    });

    it("should render the header", () => {
        render(<ThemeSwitcher />);
        expect(screen.getByText(/Appearance/i)).toBeInTheDocument();
    });

    it("should render all theme options", () => {
        render(<ThemeSwitcher />);

        expect(screen.getByText("Light")).toBeInTheDocument();
        expect(screen.getByText("Dark")).toBeInTheDocument();
        expect(screen.getByText("System")).toBeInTheDocument();
    });

    it("should render 3 radio buttons", () => {
        render(<ThemeSwitcher />);
        const radios = screen.getAllByRole("radio");
        expect(radios).toHaveLength(3);
    });

    it("should have light as default theme", () => {
        render(<ThemeSwitcher />);
        expect(screen.getAllByRole("radio")[0]).toBeChecked();
    });

    it("should use initialTheme prop when provided", () => {
        render(<ThemeSwitcher initialTheme="dark" />);
        const darkRadio = screen.getAllByRole("radio")[1];
        expect(darkRadio).toBeChecked();
    });

    it("should change theme when radio is clicked", () => {
        render(<ThemeSwitcher />);

        const darkRadio = screen.getAllByRole("radio")[1];
        fireEvent.click(darkRadio);

        expect(darkRadio).toBeChecked();
        expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("should toggle dark class on document element", () => {
        render(<ThemeSwitcher />);

        fireEvent.click(screen.getAllByRole("radio")[1]);

        expect(document.documentElement).toHaveClass("dark");
    });

    it("should persist theme to localStorage", () => {
        render(<ThemeSwitcher />);

        fireEvent.click(screen.getAllByRole("radio")[2]);

        expect(localStorage.getItem("theme")).toBe("system");
    });

    it("should call onThemeChange callback when provided", () => {
        const handleThemeChange = jest.fn();
        render(<ThemeSwitcher onThemeChange={handleThemeChange} />);

        const darkRadio = screen.getAllByRole("radio")[1];
        fireEvent.click(darkRadio);

        expect(handleThemeChange).toHaveBeenCalledWith("dark");
    });

    it("should not throw when onThemeChange is not provided", () => {
        render(<ThemeSwitcher />);

        const darkRadio = screen.getAllByRole("radio")[1];
        expect(() => fireEvent.click(darkRadio)).not.toThrow();
    });

    it("should cycle through all themes correctly", () => {
        const handleThemeChange = jest.fn();
        render(<ThemeSwitcher onThemeChange={handleThemeChange} />);

        fireEvent.click(screen.getAllByRole("radio")[1]);
        expect(handleThemeChange).toHaveBeenLastCalledWith("dark");

        fireEvent.click(screen.getAllByRole("radio")[2]);
        expect(handleThemeChange).toHaveBeenLastCalledWith("system");
    });
});

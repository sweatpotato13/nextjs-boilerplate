import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeSwitcher } from "../ui";

describe("ThemeSwitcher", () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.removeAttribute("data-theme");
    });

    it("should render the header", () => {
        render(<ThemeSwitcher />);
        expect(screen.getByText(/APPEARANCE:/)).toBeInTheDocument();
    });

    it("should render all theme options", () => {
        render(<ThemeSwitcher />);

        expect(screen.getByText("Terminal")).toBeInTheDocument();
        expect(screen.getByText("Dark")).toBeInTheDocument();
        expect(screen.getByText("Cyberpunk")).toBeInTheDocument();
        expect(screen.getByText("Light")).toBeInTheDocument();
    });

    it("should render 4 radio buttons", () => {
        render(<ThemeSwitcher />);
        const radios = screen.getAllByRole("radio");
        expect(radios).toHaveLength(4);
    });

    it("should have terminal as default theme", () => {
        render(<ThemeSwitcher />);
        const terminalRadio = screen.getByLabelText("Terminal");
        expect(terminalRadio).toBeChecked();
    });

    it("should display current theme badge", () => {
        render(<ThemeSwitcher />);
        expect(screen.getByText("TERMINAL")).toBeInTheDocument();
    });

    it("should use initialTheme prop when provided", () => {
        render(<ThemeSwitcher initialTheme="dark" />);
        const darkRadio = screen.getByLabelText("Dark");
        expect(darkRadio).toBeChecked();
        expect(screen.getByText("DARK")).toBeInTheDocument();
    });

    it("should change theme when radio is clicked", () => {
        render(<ThemeSwitcher />);

        const darkRadio = screen.getByLabelText("Dark");
        fireEvent.click(darkRadio);

        expect(darkRadio).toBeChecked();
        expect(screen.getByText("DARK")).toBeInTheDocument();
    });

    it("should update document data-theme attribute on theme change", () => {
        render(<ThemeSwitcher />);

        const cyberpunkRadio = screen.getByLabelText("Cyberpunk");
        fireEvent.click(cyberpunkRadio);

        expect(document.documentElement.getAttribute("data-theme")).toBe(
            "cyberpunk"
        );
    });

    it("should persist theme to localStorage", () => {
        render(<ThemeSwitcher />);

        const lightRadio = screen.getByLabelText("Light");
        fireEvent.click(lightRadio);

        expect(localStorage.getItem("theme")).toBe("light");
    });

    it("should call onThemeChange callback when provided", () => {
        const handleThemeChange = jest.fn();
        render(<ThemeSwitcher onThemeChange={handleThemeChange} />);

        const darkRadio = screen.getByLabelText("Dark");
        fireEvent.click(darkRadio);

        expect(handleThemeChange).toHaveBeenCalledWith("dark");
    });

    it("should not throw when onThemeChange is not provided", () => {
        render(<ThemeSwitcher />);

        const darkRadio = screen.getByLabelText("Dark");
        expect(() => fireEvent.click(darkRadio)).not.toThrow();
    });

    it("should cycle through all themes correctly", () => {
        const handleThemeChange = jest.fn();
        render(<ThemeSwitcher onThemeChange={handleThemeChange} />);

        fireEvent.click(screen.getByLabelText("Dark"));
        expect(handleThemeChange).toHaveBeenLastCalledWith("dark");

        fireEvent.click(screen.getByLabelText("Cyberpunk"));
        expect(handleThemeChange).toHaveBeenLastCalledWith("cyberpunk");

        fireEvent.click(screen.getByLabelText("Light"));
        expect(handleThemeChange).toHaveBeenLastCalledWith("light");

        fireEvent.click(screen.getByLabelText("Terminal"));
        expect(handleThemeChange).toHaveBeenLastCalledWith("terminal");
    });

    it("should set initial theme on document", () => {
        render(<ThemeSwitcher initialTheme="cyberpunk" />);
        expect(document.documentElement.getAttribute("data-theme")).toBe(
            "cyberpunk"
        );
    });
});

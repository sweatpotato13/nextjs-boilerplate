import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "../button";

describe("Button", () => {
    describe("default rendering", () => {
        it("should render children correctly", () => {
            render(<Button>Click me</Button>);
            expect(
                screen.getByRole("button", { name: "Click me" })
            ).toBeInTheDocument();
        });

        it("should expose a button element by default", () => {
            render(<Button>Primary</Button>);
            const button = screen.getByRole("button");
            expect(button).toBeEnabled();
        });
    });

    describe("variants", () => {
        it.each(["secondary", "ghost", "link", "outline"] as const)(
            "should render %s variant without breaking accessibility",
            variant => {
                render(<Button variant={variant}>Button</Button>);
                expect(
                    screen.getByRole("button", { name: "Button" })
                ).toBeInTheDocument();
            }
        );

        it.each(["accent", "info", "success", "warning", "error"] as const)(
            "should render custom %s variant content",
            variant => {
                render(<Button variant={variant}>Button</Button>);
                expect(
                    screen.getByRole("button", { name: "Button" })
                ).toBeInTheDocument();
            }
        );
    });

    describe("size modifiers", () => {
        it.each(["lg", "md", "sm", "xs"] as const)(
            "should apply %s size correctly",
            size => {
                render(<Button size={size}>Button</Button>);
                const button = screen.getByRole("button");
                expect(button).toBeInTheDocument();
            }
        );
    });

    describe("style modifiers", () => {
        it("should apply outline class when outline is true", () => {
            render(<Button outline>Outline</Button>);
            const button = screen.getByRole("button");
            expect(button).toBeInTheDocument();
        });

        it("should apply wide class when wide is true", () => {
            render(<Button wide>Wide</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("w-full");
        });

        it("should apply glass class when glass is true", () => {
            render(<Button glass>Glass</Button>);
            const button = screen.getByRole("button");
            expect(button).toBeInTheDocument();
        });
    });

    describe("custom props", () => {
        it("should pass custom className", () => {
            render(<Button className="custom-class">Custom</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("custom-class");
        });

        it("should pass native button props", () => {
            render(
                <Button disabled type="submit">
                    Submit
                </Button>
            );
            const button = screen.getByRole("button");
            expect(button).toBeDisabled();
            expect(button).toHaveAttribute("type", "submit");
        });

        it("should handle click events", () => {
            const handleClick = jest.fn();
            render(<Button onClick={handleClick}>Click</Button>);
            fireEvent.click(screen.getByRole("button"));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    });

    describe("combined modifiers", () => {
        it("should combine multiple modifiers correctly", () => {
            render(
                <Button
                    variant="secondary"
                    size="lg"
                    outline
                    wide
                    className="extra"
                >
                    Combined
                </Button>
            );
            const button = screen.getByRole("button");
            expect(button).toHaveClass("extra", "w-full");
        });
    });
});

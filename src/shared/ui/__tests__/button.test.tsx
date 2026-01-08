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

        it("should apply primary variant by default", () => {
            render(<Button>Primary</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("btn", "btn-primary");
        });
    });

    describe("DaisyUI variants", () => {
        it.each([
            "secondary",
            "accent",
            "info",
            "success",
            "warning",
            "error",
            "ghost",
            "link",
        ] as const)("should apply %s variant correctly", variant => {
            render(<Button variant={variant}>Button</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass(`btn-${variant}`);
        });
    });

    describe("terminal variant", () => {
        it("should render terminal style button", () => {
            render(<Button variant="terminal">Terminal</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("font-mono", "text-primary");
            expect(button).toHaveTextContent("[ Terminal ]");
        });

        it.each(["lg", "md", "sm", "xs"] as const)(
            "should apply %s size for terminal variant",
            size => {
                render(
                    <Button variant="terminal" size={size}>
                        Terminal
                    </Button>
                );
                const button = screen.getByRole("button");
                expect(button).toBeInTheDocument();
            }
        );

        it("should apply wide class for terminal variant", () => {
            render(
                <Button variant="terminal" wide>
                    Wide
                </Button>
            );
            const button = screen.getByRole("button");
            expect(button).toHaveClass("w-full");
        });
    });

    describe("size modifiers", () => {
        it.each(["lg", "md", "sm", "xs"] as const)(
            "should apply %s size correctly",
            size => {
                render(<Button size={size}>Button</Button>);
                const button = screen.getByRole("button");
                expect(button).toHaveClass(`btn-${size}`);
            }
        );
    });

    describe("style modifiers", () => {
        it("should apply outline class when outline is true", () => {
            render(<Button outline>Outline</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("btn-outline");
        });

        it("should apply wide class when wide is true", () => {
            render(<Button wide>Wide</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("btn-wide");
        });

        it("should apply glass class when glass is true", () => {
            render(<Button glass>Glass</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("glass");
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
            expect(button).toHaveClass(
                "btn",
                "btn-secondary",
                "btn-lg",
                "btn-outline",
                "btn-wide",
                "extra"
            );
        });
    });
});

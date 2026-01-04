"use client";

import { TerminalFrame } from "@shared/ui";

export const AboutPage = () => {
    return (
        <main className="min-h-screen p-4 md:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <TerminalFrame title="ABOUT.md">
                    {/* Boot sequence */}
                    <div className="text-primary/60 text-sm mb-6">
                        <span className="text-secondary">&gt;</span> cat
                        ABOUT.md
                        <br />
                        <span className="text-secondary">&gt;</span>{" "}
                        <span className="text-success">
                            Loading documentation...
                        </span>
                    </div>

                    {/* ASCII Header */}
                    <pre className="text-primary text-xs mb-6 leading-tight">
                        {`
 _____ ____  ____  
|  ___|  _ \\/ ___| 
| |_  | |_) \\___ \\ 
|  _| |  __/ ___) |
|_|   |_|   |____/ 
                        `}
                    </pre>

                    <section className="mb-8">
                        <h2 className="text-primary text-lg mb-3">
                            <span className="text-secondary">&gt;</span>{" "}
                            WHAT_IS_FSD:
                        </h2>
                        <div className="pl-4 border-l-2 border-primary/30 text-primary/80 space-y-2">
                            <p>
                                Feature-Sliced Design (FSD) is an architectural
                                methodology for frontend applications that helps
                                organize code in a way that scales with the
                                project&apos;s complexity and team size.
                            </p>
                            <p>
                                FSD divides your application into layers,
                                slices, and segments, making the codebase more
                                predictable and maintainable.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-primary text-lg mb-3">
                            <span className="text-secondary">&gt;</span>{" "}
                            KEY_PRINCIPLES:
                        </h2>
                        <ul className="space-y-2 text-primary/80">
                            <li className="flex items-start gap-2">
                                <span className="text-success shrink-0">
                                    [+]
                                </span>
                                <span>
                                    <span className="text-warning">
                                        Layers:
                                    </span>{" "}
                                    Code is organized in layers with strict
                                    dependency rules (shared → entities →
                                    features → widgets → pages → app)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-success shrink-0">
                                    [+]
                                </span>
                                <span>
                                    <span className="text-warning">
                                        Slices:
                                    </span>{" "}
                                    Business domains are isolated into slices
                                    (user, todo, etc.)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-success shrink-0">
                                    [+]
                                </span>
                                <span>
                                    <span className="text-warning">
                                        Segments:
                                    </span>{" "}
                                    Code is split by technical purpose (ui,
                                    model, api, etc.)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-success shrink-0">
                                    [+]
                                </span>
                                <span>
                                    <span className="text-warning">
                                        Public API:
                                    </span>{" "}
                                    Components interact only through explicitly
                                    exported APIs
                                </span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-primary text-lg mb-3">
                            <span className="text-secondary">&gt;</span>{" "}
                            BENEFITS:
                        </h2>
                        <div className="grid md:grid-cols-2 gap-2 text-primary/80">
                            {[
                                "Clear structure for large applications",
                                "Promotes code reusability",
                                "Makes onboarding new developers easier",
                                "Prevents dependency issues",
                                "Facilitates parallel development",
                            ].map((benefit, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-accent">[*]</span>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-8 pt-4 border-t border-primary/20 text-xs text-primary/40">
                        <span className="text-secondary">&gt;</span> EOF
                    </div>
                </TerminalFrame>
            </div>
        </main>
    );
};

export const AboutPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">
                    About Feature-Sliced Design
                </h1>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">
                                What is Feature-Sliced Design?
                            </h2>
                            <p className="text-base-content opacity-80 mb-4">
                                Feature-Sliced Design (FSD) is an architectural
                                methodology for frontend applications that helps
                                organize code in a way that scales with the
                                project&apos;s complexity and team size.
                            </p>
                            <p className="text-base-content opacity-80 mb-4">
                                FSD divides your application into layers,
                                slices, and segments, making the codebase more
                                predictable and maintainable.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">
                                Key Principles
                            </h2>
                            <ul className="list-disc pl-6 space-y-2 text-base-content opacity-80">
                                <li>
                                    <strong>Layers:</strong> Code is organized
                                    in layers with strict dependency rules
                                    (shared → entities → features → widgets →
                                    pages → app)
                                </li>
                                <li>
                                    <strong>Slices:</strong> Business domains
                                    are isolated into slices (user, todo, etc.)
                                </li>
                                <li>
                                    <strong>Segments:</strong> Code is split by
                                    technical purpose (ui, model, api, etc.)
                                </li>
                                <li>
                                    <strong>Public API:</strong> Components
                                    interact only through explicitly exported
                                    APIs
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Benefits
                            </h2>
                            <ul className="list-disc pl-6 space-y-2 text-base-content opacity-80">
                                <li>Clear structure for large applications</li>
                                <li>Promotes code reusability</li>
                                <li>Makes onboarding new developers easier</li>
                                <li>
                                    Prevents &quot;spaghetti code&quot; and
                                    dependency issues
                                </li>
                                <li>
                                    Facilitates parallel development in teams
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
};

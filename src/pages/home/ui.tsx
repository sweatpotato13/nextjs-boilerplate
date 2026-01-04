"use client";

import { TerminalFrame } from "@shared/ui";
import { TodoList } from "@widgets/todo-list";

export const HomePage = () => {
    return (
        <main className="min-h-screen p-4 md:p-8 lg:p-12">
            <div className="max-w-2xl mx-auto">
                <TerminalFrame title="TODO TERMINAL v1.0">
                    {/* ASCII Art Header */}
                    <pre className="text-primary text-xs md:text-sm mb-6 text-center leading-tight">
                        {`
 _____ ___  ____   ___  
|_   _/ _ \\|  _ \\ / _ \\ 
  | || | | | | | | | | |
  | || |_| | |_| | |_| |
  |_| \\___/|____/ \\___/ 
                        `}
                    </pre>

                    <div className="text-primary/60 text-sm mb-4">
                        <span className="text-secondary">&gt;</span> System
                        initialized...
                        <br />
                        <span className="text-secondary">&gt;</span> Loading
                        task manager...
                        <br />
                        <span className="text-secondary">&gt;</span>{" "}
                        <span className="text-success">Ready.</span>
                    </div>

                    <div className="border-t border-primary/20 pt-4">
                        <TodoList />
                    </div>
                </TerminalFrame>
            </div>
        </main>
    );
};

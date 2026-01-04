"use client";

import { ReactNode, useEffect, useState } from "react";

interface TerminalFrameProps {
    title: string;
    children: ReactNode;
}

export const TerminalFrame = ({ title, children }: TerminalFrameProps) => {
    const [currentDate, setCurrentDate] = useState<string>("");

    useEffect(() => {
        setCurrentDate(
            new Date().toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        );
    }, []);

    return (
        <div className="border-2 border-primary shadow-lg shadow-primary/20">
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-primary/30 bg-base-200">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-error/80" />
                    <span className="w-3 h-3 rounded-full bg-warning/80" />
                    <span className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <span className="text-primary text-sm font-medium">
                    [ {title} ]
                </span>
                <div className="w-16" />
            </div>

            {/* Content */}
            <div className="p-6 bg-base-100">{children}</div>

            {/* Status Bar */}
            <div className="px-4 py-2 border-t border-primary/30 bg-base-200 flex justify-between text-xs text-primary/50">
                <span>MODE: NORMAL</span>
                <span>{currentDate}</span>
            </div>
        </div>
    );
};

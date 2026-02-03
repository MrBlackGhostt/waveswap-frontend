"use client";

import { ReactNode } from "react";

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-screen w-full bg-black text-white font-rubik">
            <div className="w-full px-24 py-8 min-h-screen">
                {children}
            </div>
        </div>
    );
}

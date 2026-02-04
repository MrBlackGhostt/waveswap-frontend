"use client";

import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full neo-border neo-hover flex items-center px-7 py-3.5"
        >
            Switch to {theme === "light" ? "Dark" : "Light"}
        </button>
    );
}

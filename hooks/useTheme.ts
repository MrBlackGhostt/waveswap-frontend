import { useEffect, useState } from "react";

type Theme = "dark" | "light"

export function useTheme() {
    const [theme, setTheme] = useState<Theme>("dark")

    // Load saved theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => { setTheme(prev => prev === "dark" ? "light" : "dark") }

    return { theme, toggleTheme }
}
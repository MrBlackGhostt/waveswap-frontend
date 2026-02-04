"use client";

import { useTheme } from "@/hooks/useTheme";
import { motion } from "motion/react";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-12 h-12 rounded-full neo-border flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: isDark ? "#1E293B" : "#FFFFFF" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 0 : 1,
                    opacity: isDark ? 0 : 1,
                    rotate: isDark ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
            >
                <FiSun className="w-5 h-5 text-[#FF6B4A]" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 1 : 0,
                    opacity: isDark ? 1 : 0,
                    rotate: isDark ? 0 : -180,
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
            >
                <FiMoon className="w-5 h-5 text-[#60A5FA]" />
            </motion.div>
        </motion.button>
    );
}

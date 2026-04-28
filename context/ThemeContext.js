"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const themes = [
    { id: "light", name: "Light Mode", icon: "🌞" },
    { id: "dark", name: "Dark Mode", icon: "🌙" },
    { id: "midnight", name: "Midnight Blue", icon: "🌌" },
    { id: "ocean", name: "Ocean Breeze", icon: "🌊" },
    { id: "forest", name: "Forest Green", icon: "🌲" },
    { id: "sunset", name: "Sunset Vibes", icon: "🌅" },
    { id: "cyberpunk", name: "Cyberpunk", icon: "🚀" },
    { id: "coffee", name: "Coffee Break", icon: "☕" },
    { id: "dracula", name: "Dracula", icon: "🧛" },
    { id: "retro", name: "Retro Wave", icon: "📼" },
];

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        setMounted(true);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    // To avoid hydration mismatch, we render the children within the provider
    // but the theme will default to 'light' on the server/first render.
    // The useEffect above will update it to the saved preference.

    return (
        <ThemeContext.Provider value={{ theme, changeTheme, themes }}>
            {/* Prevent flash by hiding content until mounted if strictly needed, 
                but for SEO and static generation, we generally want to render. 
                If hydration mismatch is a concern for icons, we can handle it in the component. */}
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

// file: components/ThemeSwitcher.js
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
    const { theme, changeTheme, themes } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

    return (
        <div className="theme-switcher" ref={dropdownRef}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="switcher-btn glass"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Change Theme"
            >
                <span className="current-icon">{currentThemeObj.icon}</span>
                <span className="current-name">{currentThemeObj.name}</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="switcher-dropdown glass"
                    >
                        <div className="dropdown-inner">
                            <div className="dropdown-header">Select Theme</div>
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        changeTheme(t.id);
                                        setIsOpen(false);
                                    }}
                                    className={`theme-option ${theme === t.id ? "active" : ""}`}
                                >
                                    <span className="option-icon">{t.icon}</span>
                                    <span className="option-name">{t.name}</span>
                                    {theme === t.id && (
                                        <motion.div
                                            layoutId="activeTheme"
                                            className="active-indicator"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

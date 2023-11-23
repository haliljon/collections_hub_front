import React, { useEffect, useState } from "react";
import { useDarkMode } from "./DarkModeContext";

const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
        localStorage.setItem("dark-theme", isDarkMode ? "enabled" : "disabled");
    }, [isDarkMode]);

    return (
        <div className="toggle-switch">
            <div className={`button r ${isDarkMode ? "dark-theme" : ""}`} id="button-1">
                <input
                    type="checkbox"
                    className="checkbox"
                    aria-label="toggle"
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                />
                <div className="knobs"></div>
                <div className="layer"></div>
            </div>
        </div>
    );
};

export default DarkModeToggle;

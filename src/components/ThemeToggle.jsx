import React from 'react';
import { useApp } from '../context/AppContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useApp();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <span className="theme-icon">
                {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span className="theme-label">
                {theme === 'light' ? 'Dark' : 'Light'}
            </span>
        </button>
    );
};

export default ThemeToggle;

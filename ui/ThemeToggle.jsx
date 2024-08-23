import React from 'react';

export const ThemeToggle = ({ isDark, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
        {isDark ? '☀️' : '🌙'}
    </button>
);

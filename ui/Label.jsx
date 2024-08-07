import React from 'react';

export const Label = ({ htmlFor, children }) => (
    <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-secondary dark:text-primary"
    >
        {children}
    </label>
);

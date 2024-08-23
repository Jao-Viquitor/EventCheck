import React from 'react';

export const Label = ({ htmlFor, children }) => (
    <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm sm:text-base lg:text-lg font-medium text-secondary dark:text-primary"
    >
        {children}
    </label>
);

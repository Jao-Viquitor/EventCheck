import React from 'react';

export const LoadingScreen = ({ message = "Loading..." }) => (
    <div className="min-h-screen bg-secondary flex items-center justify-center dark:bg-gray-950">
        <h1 className="mt-4 text-xl text-secondary dark:text-primary font-bold">{message}</h1>
    </div>
);

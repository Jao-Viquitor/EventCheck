import React from 'react';

export const LoadingScreen = ({ message = "Loading..." }) => (
    <div className="min-h-screen bg-secondary flex items-center justify-center dark:bg-gray-950">
        <h1 className="mt-4 text-lg sm:text-xl lg:text-2xl text-secondary dark:text-primary font-bold text-center px-4">
            {message}
        </h1>
    </div>
);

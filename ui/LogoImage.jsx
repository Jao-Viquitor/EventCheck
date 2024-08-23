import React from 'react';

export function LogoImage() {
    return (
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-32 lg:h-32 mx-auto">
            <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
            />
        </div>
    );
}

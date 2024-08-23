import React from 'react';

export const Pagination = ({ currentPage, totalPages, handlePreviousPage, handleNextPage }) => (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50 mb-2 sm:mb-0 w-24"
        >
            Previous
        </button>
        <span className="text-white mb-2 sm:mb-0">Page {currentPage} of {totalPages}</span>
        <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50 w-24"
        >
            Next
        </button>
    </div>
);

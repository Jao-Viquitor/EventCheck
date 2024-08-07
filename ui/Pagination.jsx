import React from 'react';

export const Pagination = ({ currentPage, totalPages, handlePreviousPage, handleNextPage }) => (
    <div className="flex justify-between mt-4">
        <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
            Previous
        </button>
        <span className="text-white">Page {currentPage} of {totalPages}</span>
        <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
            Next
        </button>
    </div>
);

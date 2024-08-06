import React from 'react';

export const EventSelector = ({ communities, selectedEvent, onSelect }) => {
    return (
        <div className="mb-4">
            <label htmlFor="event-select" className="block text-lg font-medium text-gray-700">
                Select an Event
            </label>
            <select
                id="event-select"
                value={selectedEvent}
                onChange={(e) => onSelect(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="" disabled>Select an event</option>
                {communities.map((community) => (
                    <option key={community._id} value={community._id}>
                        {community.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

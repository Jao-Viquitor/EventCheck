import React from 'react';

export const EventSelector = ({ communities, selectedEvent, onSelect }) => {
    return (
        <div className="max-w-sm mx-auto text-start pt-6 ms-2">
            <label htmlFor="event-select"
                   className="block mb-2 text-sm font-medium text-secondary dark:text-primary">
                Select an Event
            </label>
            <select
                id="event-select"
                value={selectedEvent}
                onChange={(e) => onSelect(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="" selected
                className="text-secondary  dark:text-primary text-sm">Select an event</option>
                {communities.map((community) => (
                    <option key={community._id} value={community._id}>
                        {community.name}
                    </option>
                ))}
            </select>

        </div>
    );
};

import React from 'react';
import {Label} from "./Label.jsx";

export const EventSelector = ({ communities, selectedEvent, onSelect }) => (
        <div className="max-w-sm mx-auto text-start pt-6 ms-2">
            <Label htmlFor="event-select">Select an Event</Label>
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

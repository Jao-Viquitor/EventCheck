import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../communities/communities';
import { People } from "../people/people";
import { EventSelector } from './EventSelector.jsx';
import { PeopleList } from './PeopleList.jsx';
import { EventSummary } from './EventSummary.jsx';

export const App = () => {
    const [selectedEvent, setSelectedEvent] = useState('');

    const { communities, people, isLoading } = useTracker(() => {
        // eslint-disable-next-line no-undef
        const communityHandler = Meteor.subscribe('communities');
        const peopleHandler = Meteor.subscribe('peopleForEvent', selectedEvent);

        return {
            communities: Communities.find().fetch(),
            people: People.find({ communityId: selectedEvent }).fetch(),
            isLoading: !communityHandler.ready() || !peopleHandler.ready(),
        };
    });

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Event Check-In System</h1>
            <EventSelector
                communities={communities}
                selectedEvent={selectedEvent}
                onSelect={setSelectedEvent}
            />
            {selectedEvent && (
                <>
                    <EventSummary people={people} />
                    <PeopleList people={people} />
                </>
            )}
        </div>
    );
};

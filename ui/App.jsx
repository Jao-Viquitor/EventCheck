import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../communities/communities';
import { People } from "../people/people";
import { EventSelector } from './EventSelector.jsx';
import { PeopleList } from './PeopleList.jsx';
import { EventSummary } from './EventSummary.jsx';
import {LogoImage} from "./LogoImage.jsx";
import {LoadingScreen} from "./Loading.jsx";

export const App = () => {
    const [selectedEvent, setSelectedEvent] = useState('');

    const { communities, people, isLoading } = useTracker(() => {
        const communityHandler = Meteor.subscribe('communities');
        const peopleHandler = Meteor.subscribe('peopleForEvent', selectedEvent);

        return {
            communities: Communities.find().fetch(),
            people: People.find({ communityId: selectedEvent }).fetch(),
            isLoading: !communityHandler.ready() || !peopleHandler.ready(),
        };
    });

    if (isLoading) return (
        <LoadingScreen/>
    );

    return (
        <div className="min-h-screen bg-secondary items-center dark:bg-gray-950">
            <div
                className="flex justify-center pt-24 pb-24">
                <div
                    className="dark:bg-gray-900 bg-hoverSecondary p-2 pt-6 pb-6 rounded-lg shadow-lg text-center text-primary w-96">
                    <LogoImage/>
                    <h1 className="mt-4 text-xl text-secondary dark:text-primary font-bold">Event
                        Check-In
                        System</h1>
                    <EventSelector
                        communities={communities}
                        selectedEvent={selectedEvent}
                        onSelect={setSelectedEvent}
                    />
                </div>
                <div className="ps-24">
                    {selectedEvent && (
                        <EventSummary people={people}/>
                    )}
                </div>
            </div>

            {selectedEvent && (
                <PeopleList people={people}/>
            )}
        </div>

    );
};

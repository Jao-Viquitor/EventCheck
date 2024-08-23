import React, {useEffect, useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../communities/communities';
import { People } from "../people/people";
import { EventSelector } from './EventSelector.jsx';
import { PeopleList } from './PeopleList.jsx';
import { EventSummary } from './EventSummary.jsx';
import { LogoImage } from "./LogoImage.jsx";
import { LoadingScreen } from "./Loading.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";

export const App = () => {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDark(savedTheme === 'dark');
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

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
        <LoadingScreen />
    );

    return (
        <div
            className="min-h-screen bg-secondary items-center justify-center dark:bg-gray-950">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme}/>
            <div
                className="flex flex-col lg:flex-row xl:flex-row  items-center justify-center pt-24 pb-6">
                <div
                    className="w-11/12 sm:w-11/12 md:w-96 lg:me-4 xl:me-4 items-center justify-center dark:bg-gray-900 bg-hoverSecondary p-2 pt-6 pb-6 rounded-lg shadow-lg text-center text-primary">
                    <LogoImage/>
                    <h1 className="mt-4 text-xl text-secondary dark:text-primary font-bold">
                        Event Check-In System
                    </h1>
                    <EventSelector
                        communities={communities}
                        selectedEvent={selectedEvent}
                        onSelect={setSelectedEvent}
                    />
                </div>
                {selectedEvent && (
                    <div className="flex items-center justify-center mt-8">
                        <EventSummary people={people}/>
                    </div>
                )}
            </div>

            {selectedEvent && (
                <PeopleList people={people}/>
            )}
        </div>
    );
};

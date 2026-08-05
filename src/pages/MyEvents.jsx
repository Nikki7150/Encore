import '../styles/MyEvents.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSavedEvents } from '../api/userData';

const MyEvents = () => {
    const { user } = useAuth();
    const [savedEvents, setSavedEvents] = useState([]);

    useEffect( () => {
        if (user) {
            getSavedEvents(user.uid).then((savedEventsData) => {
                savedEventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
                setSavedEvents(savedEventsData);
            });
        }
    }, [user]);

    return (
        <div className="my-events-screen">
            <h1 className="my-events-title">My Saved Events</h1>
            {savedEvents.length === 0 ? (
                <p className="no-saved-events">You have no saved events.</p>
            ) : (
                <ul className="saved-events-list">
                    {savedEvents.map((event) => (
                        <li key={event.id} className="saved-event-item">
                            <h2 className="saved-event-name">{event.name}</h2>
                            <p className="saved-event-date">Date: {event.date}</p>
                            <p className="saved-event-venue">Venue: {event.venue}</p>
                            <p className="saved-event-city">City: {event.city}</p>
                            {event.imageUrl && (
                                <img src={event.imageUrl} alt={event.name} className="saved-event-image" />
                            )}
                            {event.ticketUrl && (
                                <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="saved-event-ticket-link">
                                    Get Tickets
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyEvents;
import '../styles/MyEvents.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSavedEvents } from '../api/userData';
import { IoBookmark } from 'react-icons/io5';
import { unsaveEvent } from "../api/userData";

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

    const handleUnsave = async (eventId) => {
        if (!user) {
            alert("Please log in to unsave events.");
            return;
        }
        await unsaveEvent(user.uid, eventId);
        setSavedEvents(current => current.filter(event => event.id !== eventId))
    };

    return (
        <div className="my-events-screen">
            <h1 className="my-events-title">my saved events</h1>
            {savedEvents.length === 0 ? (
                <p className="no-saved-events">You have no saved events.</p>
            ) : (
                <ul className="saved-events-list">
                    <div className="timeline">
                        <div className="timeline-line"></div>
                        {savedEvents.map((event, index) => (
                            <div className="timeline-row" key={event.id}>
                                <p className="saved-event-date">
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                                <div className="timeline-dot"></div>
                                <li className="saved-event-item">
                                    {event.imageUrl && (
                                        <img src={event.imageUrl} alt={event.name} className="saved-event-image" />
                                    )}
                                    <div className="saved-event-info">
                                        <h2 className="saved-event-name">{event.name}</h2>
                                        <p className="saved-event-venue">Venue: {event.venue}</p>
                                        <p className="saved-event-city">City: {event.city}</p>
                                    </div>
                                    <IoBookmark className="saved-event-bookmark" onClick={() => handleUnsave(event.id)} style={{ cursor: 'pointer' }}/>
                                    {event.ticketUrl && (
                                        <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="saved-event-ticket-link">
                                            Get Tickets
                                        </a>
                                    )}
                                </li>
                            </div>
                        ))}
                    </div>
                </ul>
            )}
        </div>
    );
};

export default MyEvents;
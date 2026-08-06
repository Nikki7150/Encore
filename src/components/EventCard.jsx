import '../styles/Explore.css';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import { Link } from "react-router-dom";

const EventCard = ({ event, isSaved, onToggleSave, searchQuery }) => {
    const timeStr = event.dates.start.localTime;
    let formattedTime = 'TBA';

    if (timeStr) {
        const [hourStr, minuteStr] = timeStr.split(':');
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        formattedTime = `${hour}:${minuteStr} ${ampm}`;
    }

    const rawDate = event.dates.start.localDate; // Example: "2026-08-03"
    const formattedDate = new Date(`${rawDate}T00:00:00`).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="event-card">
            <Link to={`/event/${event.id}`} state={{ event, searchQuery, from: '/explore' }} className="event-link">
                <div className="event-info">
                    <div className="event-container">
                        <h2 className="event-name">{event.name}</h2>
                        <div className="event-column">
                            <p className="event-date">{formattedDate}</p>
                            <p className="event-time">Time: <span>{formattedTime}</span></p>
                            <p className="event-venue">Venue: <span>{event._embedded.venues[0].name}</span></p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className={isSaved ? "event-save saved" : "event-save"}>
                <h2 className="event-name-2">{event.name}</h2>
                <button className="save-button" onClick={() => onToggleSave(event)}>
                    {isSaved ? <IoBookmark /> : <IoBookmarkOutline />}
                </button>
            </div>
        </div>
    );
};

export default EventCard;
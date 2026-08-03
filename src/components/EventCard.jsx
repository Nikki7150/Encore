import '../styles/Explore.css';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';

const EventCard = ({ event, isSaved, onToggleSave }) => {
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

    return (
        <div className="event-card">
            <div className="event-info">
                <div className="event-container">
                    <h2 className="event-name">{event.name}</h2>
                    <div className="event-column">
                        <p className="event-date">{event.dates.start.localDate}</p>
                        <p className="event-time">Time: <span>{formattedTime}</span></p>
                        <p className="event-venue">Venue: <span>{event._embedded.venues[0].name}</span></p>
                    </div>
                </div>
            </div>
            <div className={isSaved ? "event-save saved" : "event-save"}>
                <h2 className="event-name-2">{event.name}</h2>
                <button className="save-button" onClick={(e) => {e.stopPropagation(); onToggleSave(event);}}>
                    {isSaved ? <IoBookmark /> : <IoBookmarkOutline />}
                </button>
            </div>
        </div>
    );
};

export default EventCard;
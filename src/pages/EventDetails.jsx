import { useParams } from 'react-router-dom';
import '../styles/EventDetails.css';
import { useLocation } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

const EventDetails = () => {
    const { eventId } = useParams();
    const location = useLocation();
    const event = location.state?.event;

    if (!event) {
        return <p>Event not found.</p>;
    }

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
        <div className="event-details-screen">
            <Link to="/explore" state={{ searchQuery: location.state?.searchQuery }} className="back-button">
                <FaAngleLeft />
            </Link>
            <div className="event-details-container">
                <h1 className="event-details-title">{event.name}</h1>
                <p className="event-details-date">Date: {event.dates.start.localDate}</p>
                <p className="event-details-time">Time: {formattedTime}</p>
                <p className="event-details-venue">Venue: {event._embedded.venues[0].name}</p>
                <p className="event-details-description">{event.info || 'No description available.'}</p>
            </div>
        </div>
    );
};

export default EventDetails;
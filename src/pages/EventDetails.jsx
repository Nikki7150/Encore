import { useParams } from 'react-router-dom';
import '../styles/EventDetails.css';
import { useLocation } from 'react-router-dom';
import { FaAngleLeft, FaRegCalendar, FaCalendarAlt, FaMapMarker, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getSavedEvents, saveEvent, unsaveEvent } from '../api/userData';
import { getBestImage } from '../utils/imageHelpers';

const EventDetails = () => {
    const { eventId } = useParams();
    const location = useLocation();
    const event = location.state?.event;
    const { user } = useAuth();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (!event) return;
        if (user) {
            getSavedEvents(user.uid).then((savedEvents) => {
                const isEventSaved = savedEvents.some((e) => e.id === event.id);
                setIsSaved(isEventSaved);
            });
        }
    }, [event, user]);

    const handleToggleSave = async (event) => {
        if (!user) {
            alert("Please log in to save events.");
            return;
        }
        try {
            if (isSaved) {
                await unsaveEvent(user.uid, event.id);
                setIsSaved(false);
            } else {
                await saveEvent(user.uid, event);
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Error toggling save:", error);
        }
    };

    if (!event) {
        return <p>Event not found.</p>;
    }

    const rawDate = event.dates?.start?.localDate || event.date;
    const timeStr = event.dates?.start?.localTime;

    let formattedTime = 'TBA';

    if (timeStr) {
        const [hourStr, minuteStr] = timeStr.split(':');
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        formattedTime = `${hour}:${minuteStr} ${ampm}`;
    }

    const formattedDate = new Date(`${rawDate}T00:00:00`).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const venue = event._embedded?.venues?.[0];
    const address = venue?.address;
    const venueName = venue?.name || 'N/A';
    const addressLine1 = address?.line1 || '';
    const cityName = address?.city?.name || '';
    const stateCode = address?.state?.stateCode || '';
    const postalCode = address?.postalCode || '';
    const formattedAddress = [addressLine1, cityName, stateCode, postalCode].filter(Boolean).join(', ') || 'N/A';
    const directionsQuery = [venueName, addressLine1, cityName, stateCode].filter(Boolean).join(', ');

    const formatICSDate = (date) => {
        const pad = (n) => String(n).padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    };

    const generateICS = (event, rawDate, timeStr, venueName, formattedAddress) => {
        const isoString = `${rawDate}T${timeStr || '19:00:00'}`;
        const startDate = new Date(isoString);
        const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

        const startDateTime = formatICSDate(startDate);
        const endDateTime = formatICSDate(endDate);

        const icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nSUMMARY:${event.name}\r\nDTSTART:${startDateTime}\r\nDTEND:${endDateTime}\r\nLOCATION:${venueName}, ${formattedAddress}\r\nDESCRIPTION:More information available at ${event.url}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
        return icsContent;
    };

    const downloadICS = () => {
        const icsContent = generateICS(event, rawDate, timeStr, venueName, formattedAddress);
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${event.name}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="event-details-screen">
            <div className="event-details-container">
                <div className="event-image-container">
                    <Link to={location.state?.from || '/explore'} state={{ searchQuery: location.state?.searchQuery }} className="back-button">
                        <FaAngleLeft />
                    </Link>
                    <img src={getBestImage(event.images)?.url} alt={event.name} className="event-details-image" />
                </div>
                <div className="event-details-info">
                    <h1 className="event-details-title">{event.name}</h1>
                    <p className="event-details-date"><FaRegCalendar size={25} /> <span>{formattedDate} ● {formattedTime}</span></p>
                    <p className="event-details-address">
                        <FaMapMarker size={25} />{' '}
                        <span>{formattedAddress}</span>
                    </p>
                    <p className="event-get-directions">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(directionsQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Get Directions
                        </a>{' '}
                        <FaExternalLinkAlt size={15} />
                    </p>
                    <div className="event-details-actions">
                        <button className={isSaved ? "event-unsave-button" : "event-save-button"} onClick={() => handleToggleSave(event)}>
                            {isSaved ? 'Unsave Event' : 'Save Event'}
                        </button>
                        <button className="event-download-ics-button" onClick={downloadICS}>
                            Download ICS
                        </button>
                    </div>
                </div>
            </div>
            <div className="event-additional-container">
                <div className="event-details-additional">
                    <p className="event-details-status">Status: {event.dates.status.code}</p>
                    <p className="event-details-sales">Sales Start: {new Date(event.sales.public.startDateTime).toLocaleString()}</p>
                    <p className="event-details-sales">Sales End: {new Date(event.sales.public.endDateTime).toLocaleString()}</p>
                    <p className="event-details-sales">Ticket Limit: {event.ticketLimit ? event.ticketLimit.info : 'N/A'}</p>
                    <p className="event-details-sales">Ticket Availability: {event.ticketAvailability ? event.ticketAvailability.status : 'N/A'}</p>
                    <p className="event-details-description">{event.info || 'No description available.'}</p>
                    <a href={event.url} target="_blank" rel="noopener noreferrer" className="event-details-link">More Info <FaExternalLinkAlt size={15} /></a>
                </div>
                <div className="event-lineup" style={event._embedded.attractions && event._embedded.attractions.length > 0 ? {} : { display: 'none' }}>
                    <h2 className="event-lineup-title"><FaCalendarAlt size={25} /> Lineup</h2>
                    {event._embedded.attractions && (
                        <ul className="event-lineup-list">
                            {event._embedded.attractions.map((attraction) => (
                                <li key={attraction.id} className="event-lineup-item"> {attraction.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
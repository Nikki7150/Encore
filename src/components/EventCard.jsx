import '../styles/EventCard.css';



const EventCard = ({ event, isSaved, onToggleSave }) => {
    return (
        <div className="event-card">
            <div className="event-info">
                <h2 className="event-name">{event.name}</h2>
                <p className="event-date">{event.dates.start.localDate}</p>
                <p className="event-venue">{event._embedded.venues[0].name}</p>
            </div>
            <div className={isSaved ? "event-save saved" : "event-save"}>
                <h2 className="event-name">{event.name}</h2>
                <button className="save-button" onClick={(e) => {e.stopPropagation(); onToggleSave();}}>
                    {isSaved ? 'Unsave' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default EventCard;
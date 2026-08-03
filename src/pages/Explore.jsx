import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { searchEventsByCity } from "../api/ticketmaster";
import '../styles/Explore.css';

const Explore = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const result = await searchEventsByCity(query);
            setEvents(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="explore-container">
            <h1 className="explore-title">explore</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            <ul className="event-list">
                {events && events.map((event) => (
                    <li key={event.id} className="event-item">{event.name}</li>
                ))}
                {events.length === 0 && !loading && !error && <p>No events found.</p>}
            </ul>
        </div>
    );
}

export default Explore;
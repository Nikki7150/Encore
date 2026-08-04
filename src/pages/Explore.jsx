import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import { searchEventsByArtist, searchEventsByCity } from "../api/ticketmaster";
import '../styles/Explore.css';
import EventCard from "../components/EventCard";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSavedEvents, saveEvent, unsaveEvent } from "../api/userData";

const Explore = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastSearch, setLastSearch] = useState('');
    const { user } = useAuth();
    const [savedIds, setSavedIds] = useState(new Set());
    const [mode, setMode] = useState('city');

    useEffect(() => {
        if (user) {
            getSavedEvents(user.uid).then((saved) => {
                setSavedIds(new Set(saved.map((s) => s.id)));
            });
        }
    }, [user]);

    const handleToggleSave = async (event) => {
        if (!user) {
            alert("Please log in to save events.");
            return;
        }
        const isSaved = savedIds.has(event.id);
        const next = new Set(savedIds);
        if (isSaved) {
            try {
                await unsaveEvent(user.uid, event.id);
                next.delete(event.id);
            } catch (error) {
                console.error("Error unsaving event:", error);
            }
        } else {
            try {
                await saveEvent(user.uid, event);
                next.add(event.id);
            } catch (error) {
                console.error("Error saving event:", error);
            }
        }
        setSavedIds(next);
    };

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        setLastSearch(query);
        try {
            const result = mode === 'city' ? await searchEventsByCity(query) : await searchEventsByArtist(query);
            setEvents(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const location = useLocation();

    useEffect(() => {
        if (location.state?.searchQuery) {
            handleSearch(location.state.searchQuery, mode);
        }
    }, []);

    return (
        <div className="explore-container">
            <h1 className="explore-title">explore</h1>
            <div className="mode-toggle">
                <button className="city-mode" onClick={() => setMode('city')} style={mode === 'city' ? { backgroundColor: '#9ccdd1', color: '#222020' } : {}}>City</button>
                <button className="artist-mode" onClick={() => setMode('keyword')} style={mode === 'keyword' ? { backgroundColor: '#9ccdd1', color: '#222020' } : {}}>Artist / Venue</button>
            </div>
            <SearchBar onSearch={handleSearch} initialQuery={location.state?.searchQuery || ''} />
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            <ul className="event-list">
                {events && events.map((event) => (
                    <EventCard key={event.id} event={event} isSaved={savedIds.has(event.id)} onToggleSave={handleToggleSave} searchQuery={lastSearch} />
                ))}
                {events.length === 0 && !loading && !error && <p>No events found.</p>}
            </ul>
        </div>
    );
}

export default Explore;
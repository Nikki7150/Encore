import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/Explore.css';
import { searchEventsByArtist } from "../api/ticketmaster";
import LoadingSpinner from './LoadingSpinner';

const ArtistCard = ({ artist, isFollowed, onToggleFollow, searchQuery }) => {
    console.log('artist images:', artist.images);
    const [showEvents, setShowEvents] = useState(false);
    const [events, setEvents] = useState(null);
    const [loadingEvents, setLoadingEvents] = useState(false);

    const getBestImage = (images) => {
        if (!images || images.length === 0) return null;
        return images.reduce((best, img) => (img.width > best.width ? img : best));
    };

    const handleEventsClick = async () => {
        if (showEvents) {
            setShowEvents(false);
            return;
        }
        if (events !== null) {
            setShowEvents(true);
            return;
        }
        setLoadingEvents(true);
        setShowEvents(true);
        try {
            const eventsData = await searchEventsByArtist(artist.name);
            setEvents(eventsData);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoadingEvents(false);
        }
    };

    return (
        <div className="artist-card">
            <h2 className="artist-name">{artist.name}</h2>
            <img src={getBestImage(artist.images)?.url || artist.imageUrl} alt={artist.name} className="artist-image" />
            <div className="artist-description">
                <p className="artist-genre">Genre: {artist.classifications?.[0]?.genre?.name || artist.genre || "Unknown Genre"}</p>
                <a href={artist?.url || artist.ticketUrl} target="_blank" rel="noopener noreferrer" className="artist-info">
                    More Info
                </a>
                <button
                    className={`${isFollowed ? 'unfollow-button' : 'follow-button'}`}
                    onClick={() => onToggleFollow(artist)}
                >
                    {isFollowed ? 'Unfollow' : 'Follow'}
                </button>
                <div className="artist-events-button" onClick={handleEventsClick} >
                    <p>Events- {showEvents ? 'Hide' : 'Show'}</p>
                </div>
            </div>
            {showEvents && (
                <div className="artist-events-popup">
                    {loadingEvents ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="artist-events-list">
                            <h3>Upcoming Events:</h3>
                            <ul>
                                {events?.map((event) => (
                                    <li key={event.id}>
                                        <Link to={`/event/${event.id}`} state={{ event, searchQuery: searchQuery, from: '/following' }} className="artist-event-link">
                                            {event.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ArtistCard;
import { useState, useEffect } from 'react';
import '../styles/Home.css';
import { useAuth } from '../context/AuthContext';
import { getSavedEvents, getFollowedArtists } from '../api/userData';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useAuth();
    const [savedEvents, setSavedEvents] = useState([]);
    const [followedArtists, setFollowedArtists] = useState([]);

    const formatDate = (rawDate) => {
        if (!rawDate) return 'N/A';

        const parsedDate = new Date(`${rawDate}T00:00:00`);
        if (Number.isNaN(parsedDate.getTime())) return 'N/A';

        return parsedDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    useEffect( () => {
        if (user) {
            getSavedEvents(user.uid).then((savedEventsData) => {
                savedEventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
                setSavedEvents(savedEventsData);
            });
            getFollowedArtists(user.uid).then((followedArtistsData) => {
                setFollowedArtists(followedArtistsData);
            });
        }
    }, [user]);

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">Hey <span className="hero-name">{user?.displayName || 'there'}</span>!</h1>
                <h2 className="hero-subtitle">FIND YOUR NEXT</h2>
                <h1 className="hero-heading">encore</h1>
            </div>
            <div className="saved-events">
                <div className="saved-events-header">
                    <h2 className="saved-events-title">Your Saved Events</h2>
                    <Link to="/my-events" className="view-all-link">See All</Link>
                </div>
                {savedEvents.length === 0 ? (
                    <p className="no-saved-events-home">You have no saved events.</p>
                ) : (
                    <div className="saved-events-list-home">
                        {savedEvents.slice(0, 4).map((event) => (
                            <div className="saved-event">
                                <img src={event.imageUrl} alt={event.name} className="saved-event-image-home" />
                                <h3 className='saved-event-name-home'>{event.name}</h3>
                                <p className="saved-event-date-home">{formatDate(event.date)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="followed-artists-home">
                <div className="followed-artists-header">
                    <h2 className="followed-artists-title-home">Your Followed Artists</h2>
                    <Link to="/following" className="view-all-link">See All</Link>
                </div>
                {followedArtists.length === 0 ? (
                    <p className="no-followed-artists-home">You have no followed artists.</p>
                ) : (
                    <div className="followed-artists-list">
                        {followedArtists.slice(0, 4).map((artist) => (
                            <div key={artist.id} className="followed-artist">
                                <img src={artist.imageUrl} alt={artist.name} className="followed-artist-image" />
                                <h3 className="followed-artist-name">{artist.name}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
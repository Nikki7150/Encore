import { useState, useEffect } from 'react';
import '../styles/Home.css';
import { useAuth } from '../context/AuthContext';
import { getSavedEvents, getFollowedArtists } from '../api/userData';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useAuth();
    const [savedEvents, setSavedEvents] = useState([]);
    const [followedArtists, setFollowedArtists] = useState([]);

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
                <h2 className="saved-events-title">Your Saved Events</h2>
                <Link to="/my-events" className="view-all-link">See All</Link>
                {savedEvents.length === 0 ? (
                    <p className="no-saved-events">You have no saved events.</p>
                ) : (
                    <div className="saved-events-list">
                        {savedEvents.slice(0, 4).map((event) => (
                            <div key={event.id} className="saved-event">
                                <h3>{event.name}</h3>
                                <p>{event.date}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="followed-artists">
                <h2 className="followed-artists-title">Your Followed Artists</h2>
                <Link to="/following" className="view-all-link">See All</Link>
                {followedArtists.length === 0 ? (
                    <p className="no-followed-artists">You have no followed artists.</p>
                ) : (
                    <div className="followed-artists-list">
                        {followedArtists.slice(0, 4).map((artist) => (
                            <div key={artist.id} className="followed-artist">
                                <h3>{artist.name}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
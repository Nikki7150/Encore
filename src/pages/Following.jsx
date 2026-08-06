import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import { searchEventsByArtist, searchAttractions } from "../api/ticketmaster";
import '../styles/Following.css';
import ArtistCard from "../components/ArtistCard";
import { useAuth } from "../context/AuthContext";
import { getFollowedArtists, followArtist, unfollowArtist } from "../api/userData";

const Following = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastSearch, setLastSearch] = useState('');
    const { user } = useAuth();
    const [followedArtists, setFollowedArtists] = useState(new Set());

    useEffect(() => {
        if (user) {
            getFollowedArtists(user.uid).then((followed) => {
                setFollowedArtists(new Set(followed));
            });
        }
    }, [user]);

    const handleToggleFollow = async (artist) => {
        if (!user) {
            alert("Please log in to follow artists.");
            return;
        }
        const isFollowed = followedArtists.has(artist);
        const next = new Set(followedArtists);
        if (isFollowed) {
            try {
                await unfollowArtist(user.uid, artist);
                next.delete(artist);
            } catch (error) {
                console.error("Error unfollowing artist:", error);
            }
        } else {
            try {
                await followArtist(user.uid, artist);
                next.add(artist);
            } catch (error) {
                console.error("Error following artist:", error);
            }
        }
        setFollowedArtists(next);
    };

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        setLastSearch(query);
        try {
            const result = await searchAttractions(query);
            const filtered = result.filter(
                (artist) => artist.name.toLowerCase() === query.trim().toLowerCase()
            );
            setArtists(filtered);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.state?.searchQuery) {
            handleSearch(location.state.searchQuery, mode);
        }
    }, []);

    return (
        <div className="following-container">
            <h1 className="following-title">following</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            <div className="artist-list">
                {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} isFollowed={followedArtists.has(artist.name)} onToggleFollow={handleToggleFollow} searchQuery={lastSearch} />
                ))}
                {artists.length === 0 && !loading && !error && <p className="no-results">No artists found.</p>}
            </div>
        </div>
    );
};

export default Following;
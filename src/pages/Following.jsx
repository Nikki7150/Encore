import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import { searchEventsByArtist, searchAttractions } from "../api/ticketmaster";
import '../styles/Following.css';
import ArtistCard from "../components/ArtistCard";
import { useAuth } from "../context/AuthContext";
import { getFollowedArtists, followArtist, unfollowArtist } from "../api/userData";
import { useLocation } from "react-router-dom";

const Following = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastSearch, setLastSearch] = useState('');
    const { user } = useAuth();
    const [followedArtists, setFollowedArtists] = useState(new Set());
    const location = useLocation();
    const [followedArtistsData, setFollowedArtistsData] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (user) {
            getFollowedArtists(user.uid).then((followed) => {
                setFollowedArtists(new Set(followed.map((artist) => artist.id)));
                setFollowedArtistsData(followed);
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
        setHasSearched(true);
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
            handleSearch(location.state.searchQuery);
        }
    }, []);

    return (
        <div className="following-container">
            <h1 className="following-title">following</h1>
            <SearchBar onSearch={handleSearch} initialQuery={location.state?.searchQuery || ''} placeholder="Search for artists..." onClear={() => { setArtists([]); setHasSearched(false); }} />
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            {hasSearched && artists.length > 0 && (
                <div className="search-results">
                    {artists.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} isFollowed={followedArtists.has(artist.id)} onToggleFollow={handleToggleFollow} searchQuery={lastSearch} />
                    ))}
                </div>
            )}
            {hasSearched && artists.length === 0 && !loading && !error && <p className="no-results">No artists found.</p>}
            {!hasSearched && followedArtistsData.length > 0 && (
                <div className="followed-artists">
                    <h2 className="followed-artists-title">Your Followed Artists:</h2>
                    {followedArtistsData.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} isFollowed={true} onToggleFollow={handleToggleFollow} searchQuery={lastSearch} />
                    ))}
                </div>
            )}
            {!hasSearched && followedArtistsData.length === 0 && !loading && !error && <p className="no-followed-artists">You are not following any artists yet.</p>}
        </div>
    );
};

export default Following;
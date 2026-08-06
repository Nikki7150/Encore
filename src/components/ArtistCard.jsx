const ArtistCard = ({ artist, events, isFollowed, onToggleFollow, searchQuery }) => {
    return (
        <div className="artist-card">
            <h2 className="artist-name">{artist.name}</h2>
            <img src={artist.images?.[0]?.url} alt={artist.name} className="artist-image" />
            <button
                className={`follow-button ${isFollowed ? 'unfollow' : 'follow'}`}
                onClick={() => onToggleFollow(artist)}
            >
                {isFollowed ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
};

export default ArtistCard;
const ArtistCard = ({ artist, events }) => {
    return (
        <div className="artist-card">
            <h2 className="artist-name">{artist.name}</h2>
            <img src={artist.images?.[0]?.url} alt={artist.name} className="artist-image" />
        </div>
    );
};

export default ArtistCard;
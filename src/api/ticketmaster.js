const searchEventsByCity = (async (city) => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
    const encodedCity = encodeURIComponent(city);
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${encodedCity}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data._embedded?.events || [];
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
});

const searchAttractions = (async (keyword) => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${apiKey}&keyword=${encodedKeyword}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data._embedded?.attractions || [];
    } catch (error) {
        console.error('Error fetching attractions:', error);
        throw error;
    }
});

const searchEventsByArtist = (async (artist) => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
    const encodedArtist = encodeURIComponent(artist);
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${encodedArtist}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data._embedded?.events || [];
    } catch (error) {
        console.error('Error fetching events by artist:', error);
        throw error;
    }
});

export { searchEventsByCity, searchAttractions, searchEventsByArtist };
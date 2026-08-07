import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { getBestImage } from "../utils/imageHelpers";

const saveEvent = async (uid, event) => {
    const userRef = doc(db, "users", uid, "savedEvents", event.id);
    const userData = {
        name: event.name,
        venue: event._embedded?.venues?.[0]?.name || "Unknown Venue",
        city: event._embedded?.venues?.[0]?.city?.name || "Unknown City",
        date: event.dates?.start?.localDate || "Unknown Date",
        imageUrl: event.images?.[0]?.url || "",
        ticketUrl: event.url || "",
    };
    return setDoc(userRef, userData)
};

const unsaveEvent = async (uid, eventId) => {
    const userDocRef = doc(db, "users", uid, "savedEvents", eventId);
    return deleteDoc(userDocRef);
};

const getSavedEvents = async (uid) => {
    const userCollectionRef = collection(db, "users", uid, "savedEvents");
    const querySnapshot = await getDocs(userCollectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const followArtist = async (uid, artist) => {
    const userRef = doc(db, "users", uid, "followedArtists", artist.id);
    const artistData = {
        name: artist.name,
        genre: artist.classifications?.[0]?.genre?.name || "Unknown Genre",
        imageUrl: getBestImage(artist.images)?.url || "",
        ticketUrl: artist.url || "",
    };
    return setDoc(userRef, artistData);
};

const unfollowArtist = async (uid, artistId) => {
    const userDocRef = doc(db, "users", uid, "followedArtists", artistId);
    return deleteDoc(userDocRef);
};

const getFollowedArtists = async (uid) => {
    const userCollectionRef = collection(db, "users", uid, "followedArtists");
    const querySnapshot = await getDocs(userCollectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export { saveEvent, unsaveEvent, getSavedEvents, followArtist, unfollowArtist, getFollowedArtists };
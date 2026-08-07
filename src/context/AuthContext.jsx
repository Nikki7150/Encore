import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return() => unsubscribe();
    }, []);
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(error.message);
        }
    };
    const signup = async (email, password, username) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: username || "User" });
        } catch (error) {
            throw new Error(error.message);
        }
    };
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error(error.message);
        }
    };
    const updateUsername = async (newUsername) => {
        try {
            await updateProfile(auth.currentUser, { displayName: newUsername });
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };
    const value = { user, loading, login, signup, logout, updateUsername };
    return (
        <AuthContext.Provider value={value}>
            {loading ? <LoadingSpinner /> : children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
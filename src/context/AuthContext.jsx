import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

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
            throw new Error(error.message);
        }
    };
    const changePassword = async (currentPassword, newPassword) => {
        try {
            const credential = EmailAuthProvider.credential(auth.currentUser?.email, currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);
        } catch (error) {
            throw new Error(error.message);
        }
    };
    const value = { user, loading, login, signup, logout, updateUsername, changePassword };
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
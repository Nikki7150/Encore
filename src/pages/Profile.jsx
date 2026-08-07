import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, updateUsername } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    // store the new username in a state variable from the input
    const [newUsername, setNewUsername] = useState('');

    return (
        <div className="profile">
            <h1>My Profile</h1>
            <p>Welcome, {user?.displayName || user?.email}!</p>
            <p>Username: {user?.displayName || 'Not set'}</p>
            <input type="text" placeholder="New username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            <button className="update-username-button" onClick={() => updateUsername(newUsername)}>
                Update Username
            </button>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Profile;
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
    const { user, logout, updateUsername, changePassword } = useAuth();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        if (newPassword !== confirmNewPassword) {
            setPasswordError('New passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters');
            return;
        }
        try {
            await changePassword(currentPassword, newPassword);
            setPasswordError('');
            setPasswordSuccess('Password changed successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            setPasswordError(error.message || 'Something went wrong.');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const [newUsername, setNewUsername] = useState('');

    return (
        <div className="profile-container">
            <h1 className="profile-title">my profile</h1>
            <div className="profile-content">
                <div className="profile-header">
                    <p className="profile-welcome">Welcome, {user?.displayName || user?.email}!</p>
                    <FaUserCircle size={84} className="profile-icon" />
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div className="profile-info">
                    <p className="profile-username">Username: {user?.displayName || 'Not set'}</p>
                    <p className="profile-username">Email: {user?.email || 'Not set'}</p>
                    <p className="profile-username">Joined: {user?.metadata?.creationTime || 'Not set'}</p>
                    <input className="profile-input" type="text" placeholder="New username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                    <button className="update-username-button" onClick={() => updateUsername(newUsername)}>
                        Update Username
                    </button>
                    <form onSubmit={handleChangePassword} className="profile-password-form">
                        <input className="profile-input" type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        <input className="profile-input" type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <input className="profile-input" type="password" placeholder="Confirm new password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        <button className="update-password-button" type="submit">
                            Update Password
                        </button>
                    </form>
                    {passwordError && <p className="profile-error">{passwordError}</p>}
                    {passwordSuccess && <p className="profile-success">{passwordSuccess}</p>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
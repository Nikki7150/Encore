import React from 'react';
import '../styles/Home.css';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">Hey <span className="hero-name">{user?.displayName || 'there'}</span>!</h1>
                <h2 className="hero-subtitle">FIND YOUR NEXT</h2>
                <h1 className="hero-heading">encore</h1>
            </div>
        </div>
    );
};

export default Home;
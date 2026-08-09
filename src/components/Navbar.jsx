import '../styles/Navbar.css';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaRegUser, FaHome, FaRegCheckCircle } from "react-icons/fa";
import { IoBookmarkOutline } from 'react-icons/io5';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <NavLink to="/">
                    <img src="./src/assets/encore-icon.png" alt="Encore Logo" className="logo-image" />
                </NavLink>
            </div>
            <div className="navbar-links">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                    <span className="nav-icon"><FaHome size={25} /></span>
                    <span className="nav-label">Home</span>
                </NavLink>
                <NavLink to="/explore" className={({ isActive }) => (isActive ? 'active' : '')}>
                    <span className="nav-icon"><FaSearch size={25} /></span>
                    <span className="nav-label">Explore</span>
                </NavLink>
                <NavLink to="/my-events" className={({ isActive }) => (isActive ? 'active' : '')}>
                    <span className="nav-icon"><IoBookmarkOutline size={25} /></span>
                    <span className="nav-label">My Events</span>
                </NavLink>
                <NavLink to="/following" className={({ isActive }) => (isActive ? 'active' : '')}>
                    <span className="nav-icon"><FaRegCheckCircle size={25} /></span>
                    <span className="nav-label">Following</span>
                </NavLink>
            </div>
            <div className="navbar-profile">
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                    <span className="nav-icon"><FaRegUser size={25} /></span>
                    <span className="nav-label">Profile</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
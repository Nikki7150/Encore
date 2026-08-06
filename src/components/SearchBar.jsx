import { useState } from "react";
import '../styles/Explore.css';
import { FaSearch, FaTimes } from "react-icons/fa";

const Searchbar = ({ onSearch, initialQuery, placeholder, onClear }) => {
    const [query, setQuery] = useState(initialQuery || "");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleClear = () => {
        setQuery("");
        onClear?.();
    };

    return (
        <div className="searchbar">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <p className="searchbar-text"><FaSearch /></p>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={placeholder || "Search..."}
                />
                {query && <button className="clear-button" onClick={handleClear}><FaTimes /></button>  }
                <button onClick={handleSearch} className="search-button"><FaSearch size="1.25em" /></button>
            </form>
            
        </div>
    );
};

export default Searchbar;
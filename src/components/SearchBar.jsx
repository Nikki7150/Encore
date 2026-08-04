import { useState } from "react";
import '../styles/Explore.css';
import { FaSearch } from "react-icons/fa";

const Searchbar = ({ onSearch, initialQuery }) => {
    const [query, setQuery] = useState(initialQuery || "");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    

    return (
        <div className="searchbar">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <p className="searchbar-text"><FaSearch /></p>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search by City..."
                />
                <button onClick={handleSearch}><FaSearch size="1.25em" /></button>
            </form>
            
        </div>
    );
};

export default Searchbar;
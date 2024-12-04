import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './search.css';
import { ReactComponent as Tic } from '../../assets/Tic.svg';

const Search = ({ searchTitle, setSelectedProduct }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    // Debounce searchTerm
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 50); // Adjust the delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        const searchProducts = async () => {
            if (debouncedTerm) {
                try {
                    setIsLoading(true);
                    const response = await axios.get(`http://localhost:8087/dashboard/search?name=${debouncedTerm}`);
                    setSearchResults(response.data);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                    setIsLoading(false);
                }
            }
        };

        searchProducts();
    }, [debouncedTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchResultClick = (result) => {
        setSearchResults([]);
        setSelectedProduct(result);
        setSearchTerm(result.lib);
        setSelectedItemId(prevId => prevId === result._id ? null : result._id); // Toggle selected item ID
    };

    return (
        <div>
            <div>{searchTitle}</div>
            <div className="search">
                <input
                    type="text"
                    className="search__input"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="suggestions">
                        {searchResults.map((result, index) => (
                            <div className="results" key={index}>
                                <div
                                    className={`ellipse-22-search ${selectedItemId === result._id ? 'blue' : ''}`}
                                    onClick={() => handleSearchResultClick(result)}
                                >
                                    {selectedItemId === result._id && <Tic />}
                                </div>
                                <div className="ellipse-19-search"></div>
                                <div className="result" onClick={() => handleSearchResultClick(result)}>
                                    {result.lib}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;

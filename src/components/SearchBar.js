import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { ReactComponent as FilledStarIcon } from '../star.svg';
import { ReactComponent as EmptyStarIcon } from '../empty_star.svg';
import { ReactComponent as HalfStarIcon } from '../half_star.svg';

function SearchBar({ onSearch, movies }) {
    const [inputText, setInputText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (inputText) {
            const filtered = movies.filter(movie =>
                movie.title.toLowerCase().includes(inputText.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [inputText, movies]);

    const handleInputChange = (event) => {
        const text = event.target.value;
        setInputText(text);
        onSearch(text);
        if (!text) setSuggestions([]);
    };

    const renderStars = (rating) => {
        const totalStars = 10;
        const fullStars = Math.floor(rating); 
        const halfStar = rating % 1 !== 0 ? 1 : 0; 
        const emptyStars = totalStars - fullStars - halfStar;

        return (
            <div style={{ display: 'flex' }}>
                {[...Array(fullStars)].map((_, index) => (
                    <FilledStarIcon key={`full-${index}`} className="star filled" />
                ))}
                {halfStar > 0 && <HalfStarIcon key="half-1" className="star half-filled" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <EmptyStarIcon key={`empty-${index}`} className="star empty" />
                ))}
            </div>
        );
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Enter movie name"
                value={inputText}
                onChange={handleInputChange}
                className="search-input"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map(movie => (
                        <li key={movie.title} className="suggestion-item">
                            <div className="movie-details">
                            <div className="title-and-genre">
                                    <span className="movie-title">{movie.title}</span>
                                    <span className="movie-genre">{movie.category}</span>
                                </div>
                                <div className="movie-rating">
                                    {renderStars(movie.rating)}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;

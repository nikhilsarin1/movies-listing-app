import React, { useState, useMemo, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MultiSelectFilter from './components/MultiSelectFilter';
import moviesData from './movies.json';
import './App.css';

function App() {
    const [movies] = useState(moviesData);
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [searchText, setSearchText] = useState('');
    const [ratingsFilter, setRatingsFilter] = useState([]);
    const [genreFilter, setGenreFilter] = useState([]);
    const [openFilter, setOpenFilter] = useState(null);

    const uniqueGenres = useMemo(() => [...new Set(movies.map(movie => movie.category))], [movies]);
    const ratingsOptions = useMemo(() => Array.from({ length: 10 }, (_, i) => i + 1), []);

    useEffect(() => {
        applyFilters(searchText, ratingsFilter, genreFilter);
    }, [ratingsFilter, genreFilter]); // Added useEffect to reapply filters when these change

    const handleFilterChange = (filterType, value, isChecked) => {
        const updateFilter = (prev) => {
            if (value === 'Any') return [];
            return isChecked ? [...prev, value] : prev.filter(v => v !== value);
        };

        if (filterType === 'rating') {
            setRatingsFilter(prev => updateFilter(prev));
        } 
        if (filterType === 'genre') {
            setGenreFilter(prev => updateFilter(prev));
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
        applyFilters(text, ratingsFilter, genreFilter);
    };

    const handleToggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const applyFilters = (text, ratings, genres) => {
        let filtered = movies;
        if (text) {
            filtered = filtered.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));
        }
        if (ratings.length > 0) {
            filtered = filtered.filter(movie => ratings.includes(Math.floor(movie.rating)));
        }
        if (genres.length > 0) {
            filtered = filtered.filter(movie => genres.includes(movie.category));
        }
        setFilteredMovies(filtered);
    };

    return (
        <div className="App">
            <header className="App-header">
                <SearchBar onSearch={handleSearch} movies={filteredMovies} />
                <MultiSelectFilter
                    title="Rating"
                    options={ratingsOptions}
                    selectedOptions={ratingsFilter}
                    onOptionChange={(value, isChecked) => handleFilterChange('rating', value, isChecked)}
                    isRatingFilter={true}
                    isOpen={openFilter === 'rating'}
                    onToggle={() => handleToggleFilter('rating')}
                />
                <MultiSelectFilter
                    title="Genre"
                    options={uniqueGenres}
                    selectedOptions={genreFilter}
                    onOptionChange={(value, isChecked) => handleFilterChange('genre', value, isChecked)}
                    isOpen={openFilter === 'genre'}
                    onToggle={() => handleToggleFilter('genre')}
                />
            </header>
        </div>
    );
}

export default App;

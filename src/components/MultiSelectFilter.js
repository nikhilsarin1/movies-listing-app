import React from 'react';
import './MultiSelectFilter.css';
import { ReactComponent as FilledStarIcon } from '../star.svg';
import { ReactComponent as EmptyStarIcon } from '../empty_star.svg';

function MultiSelectFilter({ title, options, selectedOptions, onOptionChange, isRatingFilter, isOpen, onToggle }) {
    const filterClass = isRatingFilter ? 'rating-filter' : 'genre-filter';

    const renderRatingStars = (rating) => {
        const totalStars = 10;
        const stars = [];
    
        for (let index = 0; index < totalStars; index++) {
            const starType = index < rating ? 'filled' : 'empty';
            const StarComponent = starType === 'filled' ? FilledStarIcon : EmptyStarIcon;
    
            stars.push(
                <StarComponent key={index} className={`star ${starType}`} />
            );
        }
    
        return <div style={{ display: 'flex' }}>{stars}</div>;
    };

    return (
        <div className={`multi-select-filter ${filterClass}`}>
            <div onClick={onToggle} className="dropdown-title">
                {title} {isOpen ? '▲' : '▼'}
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    <label>
                        <input
                            type="checkbox"
                            value="Any"
                            checked={selectedOptions.length === 0}
                            onChange={() => onOptionChange('Any')}
                        />
                        Any rating
                    </label>
                    {options.map((option, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={(e) => onOptionChange(option, e.target.checked)}
                            />
                            {isRatingFilter ? renderRatingStars(option) : option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiSelectFilter;

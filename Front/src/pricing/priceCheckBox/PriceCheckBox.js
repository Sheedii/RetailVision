import React, { useState, useEffect, useRef } from 'react';
import './priceCheckBox.css';
import arrow from '../../assets/dropdownflesh.svg';

const PriceCheckBox = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); // Single selected option
    const checkboxesRef = useRef([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('[data-control="checkbox-dropdown"]')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const toggleOption = (option) => {
        const newSelectedOption = selectedOption === option ? null : option;
        setSelectedOption(newSelectedOption);
        onSelect(newSelectedOption ? [newSelectedOption] : []); // Notify the parent component
    };

    const label = selectedOption
        ? selectedOption
        : 'Options';

    return (
        <div>
            <div className={`Pricedropdown${isOpen ? ' on' : ''}`} data-control="checkbox-dropdown">
                <label className="Pricedropdown-label" onClick={toggleOpen}>{label} <img className='dropdownArrow' src={arrow} alt="arrow" /></label>
                <div className="Pricedropdown-list">
                    {/*<a href="#" onClick={(e) => { e.preventDefault(); toggleCheckAll(); }} className="dropdown-option">
                        {selectedOptions.length === options.length ? 'Uncheck All' : 'Check All'}
                    </a>*/}
                    {options.map((option, index) => (
                        <label key={index} className="Pricedropdown-option">
                            <input
                                type="checkbox"
                                name="dropdown-group"
                                value={option}
                                ref={(el) => (checkboxesRef.current[index] = el)}
                                checked={selectedOption === option}
                                onChange={() => toggleOption(option)}
                                style={{ backgroundColor: selectedOption === option ? '#08074e' : 'transparent' }}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PriceCheckBox;

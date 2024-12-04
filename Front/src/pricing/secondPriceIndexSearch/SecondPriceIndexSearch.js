import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './secondPriceIndexSearch.css'

const SecondPriceIndexSearch = ({ onSelectItem, article }) => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(false);
    const checkboxesRef = useRef([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null); // Reference to the entire dropdown component

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Close the dropdown if click is outside of it
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

    const toggleCheckAll = () => {
        const newSelectedOptions = selectedOptions.length === article.length ? [] : article;
        setSelectedOptions(newSelectedOptions);
        onSelectItem(newSelectedOptions);
    };

    const toggleOption = (article) => {
        const newSelectedOptions = selectedOptions.includes(article)
            ? selectedOptions.filter((item) => item !== article)
            : [...selectedOptions, article];

        setSelectedOptions(newSelectedOptions);
        onSelectItem(newSelectedOptions); 
    };

    const label = selectedOptions.length === 0
        ? 'Options'
        : selectedOptions.length === 1
            ? selectedOptions[0]
            : selectedOptions.length === article.length
                ? 'All Selected'
                : `${selectedOptions.length} Selected`;

    const onChange = (event) => {
        setValue(event.target.value);
        setSelected(false);
    }

    useEffect(() => {
        const data = article.map(item => ({
            value: item,
            label: item
        }));
        console.log("data", data);
        setItems(data);
    }, [article]);

    return (
        <div className='secondSearchPriceComponent' ref={dropdownRef}> {/* Attach ref here */}
            <div className='secondsearchPrice_container'>
                <div className='secondsearchPrice_inner'>
                    <input className='inputText' placeholder='Search' type='text' value={value} onChange={onChange} onClick={toggleOpen} />
                </div>
                {isOpen && value && !selected && (
                    <div className='seconddropdownPrice'>
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleCheckAll(); }} className='articlesCheck'>
                            {selectedOptions.length === article.length ? 'Uncheck All' : 'Check All'}
                        </a>
                        {items.filter(item => {
                            const searchTerm = value.toLowerCase();
                            const fullName = item.value.toLowerCase();
                            return fullName.includes(searchTerm);
                        })
                            .slice(0, 20)
                            .map((option, index) => (
                                <label key={index} className="Pricedropdown-option roww" >
                                    <input
                                        type="checkbox"
                                        name="dropdown-group"
                                        value={option.value}
                                        ref={(eli) => (checkboxesRef.current[index] = eli)}
                                        checked={selectedOptions.includes(option.value)}
                                        onChange={() => toggleOption(option.value)}
                                        style={{ backgroundColor: selectedOptions.includes(option.value) ? '#08074e' : 'transparent' }}
                                    />
                                    {option.label}
                                </label>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SecondPriceIndexSearch;

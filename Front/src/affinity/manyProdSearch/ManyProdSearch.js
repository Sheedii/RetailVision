import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './manyProdSearch.css';

const ManyProdSearch = ({ onSelectItem, number }) => {
    const [value, setValue] = useState('');
    const [article, setArticle] = useState([]);
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(false);
    const checkboxesRef = useRef([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // <-- Error message state
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setErrorMessage(''); // Clear error when clicking outside
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const toggleOpen = () => {
        setIsOpen(true);
        inputRef.current.focus(); // Ensure the input is focused when opening the dropdown
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8000/affinity/uniqueLib/');
            setArticle(response.data.items || []);
            console.log(response.data.items);
        } catch (err) {
            console.error('Error fetching items:', err.response ? err.response.data : err.message);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const toggleOption = (article) => {
        let newSelectedOptions;

        if (selectedOptions.includes(article)) {
            newSelectedOptions = selectedOptions.filter((item) => item !== article);
            setErrorMessage(''); // Clear error when an option is unchecked
        } else {
            if (selectedOptions.length >= number) {
                setErrorMessage(`You can only select up to ${number} products.`); // Set error message
                return; // Exit without adding the new option
            }
            newSelectedOptions = [...selectedOptions, article];
        }

        setSelectedOptions(newSelectedOptions);
        onSelectItem(newSelectedOptions);

        inputRef.current.focus(); // Focus on the input field after selecting or deselecting an option
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
        setErrorMessage(''); // Clear error on input change
    };

    useEffect(() => {
        const data = article.map(item => ({
            value: item,
            label: item
        }));
        console.log("data", data);
        setItems(data);
    }, [article]);

    return (
        <div className='manyProdSearchComponent' ref={dropdownRef}>

            <div className='manyProdSearch_container'>
            {errorMessage && (
                <div className='search_error_message'>{errorMessage}</div>
            )}
                <div className='manyProdSearch_inner'>

                    <input
                        className='inputText'
                        placeholder='Search'
                        type='text'
                        value={value}
                        onChange={onChange}
                        onClick={toggleOpen}
                        ref={inputRef} // Assign the input field to the ref
                    />
                </div>
                {isOpen && (
                    <div className='manyProddropdown'>
                        {items
                            .filter(item => {
                                const searchTerm = value.toLowerCase();
                                const fullName = item.value.toLowerCase();
                                // If value is empty, show all options, otherwise filter based on input
                                return !value || fullName.includes(searchTerm);
                            })
                            // Prioritize selected options first
                            .sort((a, b) => {
                                const isSelectedA = selectedOptions.includes(a.value);
                                const isSelectedB = selectedOptions.includes(b.value);
                                return isSelectedA === isSelectedB ? 0 : isSelectedA ? -1 : 1;
                            })
                            .slice(0, 20) // Limit results to top 20
                            .map((option, index) => (
                                <label key={index} className="manyProdDropdown-option roww">
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
    );
};

export default ManyProdSearch;
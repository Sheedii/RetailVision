import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './oneProdSearch.css'

const OneProdSearch = ({ onSelectItem }) => {
    const [value, setValue] = useState('');
    const [article, setArticle] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const checkboxesRef = useRef([]);
    const [isOpen, setIsOpen] = useState(false);
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

    // Fetch items from the backend
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8000/affinity/uniqueLib/');
            setArticle(response.data.items || []);
            console.log(response.data.items);
        } catch (err) {
            console.error('Error fetching items:', err.response ? err.response.data : err.message);
        }
    };

    // Fetch items when the component mounts
    useEffect(() => {
        fetchItems();
    }, []);

    const toggleOption = (option) => {
        const newSelectedOption = selectedOption === option ? null : option;
        setSelectedOption(newSelectedOption);
        setValue(newSelectedOption || ''); // Update the search bar with the selected product or clear it
        onSelectItem(newSelectedOption);
        setIsOpen(false); // Close the dropdown after selection
    };

    const label = selectedOption ? selectedOption : 'Options';

    const onChange = (event) => {
        setValue(event.target.value);
        setSelectedOption(null); // Clear the selected option if the user starts typing a new search
        setIsOpen(true); // Reopen the dropdown if the user starts typing
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
        <div className='OneProdSearchComponent' ref={dropdownRef}>
            <div className='OneProdSearch_container'>
                <div className='OneProdSearch_inner'>
                    <input
                        className='inputText'
                        placeholder='Search'
                        type='text'
                        value={value}
                        onChange={onChange}
                        onClick={toggleOpen}
                    />
                </div>
                {isOpen && value && (
                    <div className='OneProddropdown'>
                        {items.filter(item => {
                            const searchTerm = value.toLowerCase();
                            const fullName = item.value.toLowerCase();
                            return fullName.includes(searchTerm);
                        })
                            .slice(0, 20)
                            .map((option, index) => (
                                <label key={index} className="OneProdDropdown-option roww">
                                    <input
                                        type="checkbox"
                                        name="dropdown-group"
                                        value={option.value}
                                        ref={(eli) => (checkboxesRef.current[index] = eli)}
                                        checked={selectedOption === option.value}
                                        onChange={() => toggleOption(option.value)}
                                        style={{ backgroundColor: selectedOption === option.value ? '#08074e' : 'transparent' }}
                                    />
                                    {option.label}
                                </label>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OneProdSearch;

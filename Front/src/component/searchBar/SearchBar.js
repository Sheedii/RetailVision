import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './searchBar.css';

const SearchBar = ({ onSelectItem }) => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(false);

    const onChange = (event) => {
        setValue(event.target.value);
        setSelected(false);
    }

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        onSelectItem(searchTerm);
        setSelected(true);
    }

    useEffect(() => {
        axios.get('http://localhost:8087/dashboard/Names')
            .then(response => {
                const data = response.data.map(item => ({
                    value: item,
                    label: item
                }));
                console.log("data",data);
                setItems(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <div className='SearchComponent'>
            <div className='search_container'>
                <div className='search_inner'>
                    <input className='inputText' placeholder='Search' type='text' value={value} onChange={onChange} />
                </div>
                {value && !selected && (
                    <div className='dropdown'>
                        {items.filter(item => {
                            const searchTerm = value.toLowerCase();
                            const fullName = item.value.toLowerCase();
                            return fullName.includes(searchTerm);
                        })
                        .slice(0, 20)
                            .map((item, index) => (
                                <div key={index} onClick={() => onSearch(item.value)} className='dropdown_row'>
                                    {item.value}
                                </div>
                            ))}
                    </div>
                )}

            </div>
        </div>
    )
}
export default SearchBar;

    /*const hasItemsToShow = value.trim() !== '' && items.filter(item => {
        const searchTerm = value.toLowerCase();
        const fullName = item.value.toLowerCase();
        console.log("oh no")
        return fullName.includes(searchTerm);
    }).length > 1;*/
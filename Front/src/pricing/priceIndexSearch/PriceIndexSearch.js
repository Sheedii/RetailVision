import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './priceIndexSearch.css';

const PriceIndexSearch = ({ onSelectItem, categorie }) => {
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
        const data = categorie.map(item => ({
            value: item,
            label: item
        }));
        console.log("data", data);
        setItems(data);
    }, [categorie]); 

    return (
        <div className='SearchPriceComponent'>
            <div className='searchPrice_container'>
                <div className='searchPrice_inner'>
                    <input className='inputText' placeholder='Search' type='text' value={value} onChange={onChange} />
                </div>
                {value && !selected && (
                    <div className='dropdownPrice'>
                        {items.filter(item => {
                            const searchTerm = value.toLowerCase();
                            const fullName = item.value.toLowerCase();
                            return fullName.includes(searchTerm);
                        })
                            .slice(0, 20)
                            .map((item, index) => (
                                <div key={index} onClick={() => onSearch(item.value)} className='dropdownPrice_row'>
                                    {item.value}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PriceIndexSearch;

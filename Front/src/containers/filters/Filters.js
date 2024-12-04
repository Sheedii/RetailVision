/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './filters.css'
import Select from 'react-select';

const Filters = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    
    return (
        <div className='filters'>
            <div className='selectors'>
                <div>
                    <Select options={items} value={selectedItem} placeholder="Select event" />
                </div>
                <div>
                    <Select options={items} value={selectedItem}  placeholder="Select event" />
                </div>
                <div>
                    <Select options={items} value={selectedItem}  placeholder="Select event" />
                </div>
            </div>
        </div>
    )
}

export default Filters

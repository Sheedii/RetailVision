import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './search2.css';
import Select from 'react-select';

const Search2 = ({ onSelectItem }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8087/dashboard/Names') 
      .then(response => {
        const data = response.data.map(item => ({
          value: item,
          label: item
        }));
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleItemChange = selectedItem => {
    setSelectedItem(selectedItem);
    onSelectItem(selectedItem);
  };

  return (
    <div className='Search2'>
        <Select
          options={items}
          value={selectedItem}
          onChange={handleItemChange}
          placeholder="Search"
        />
    </div>
  );
};

export default Search2;
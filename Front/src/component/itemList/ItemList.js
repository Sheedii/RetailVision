import {React, useState} from 'react';
import './itemList.css';

const ItemList = () => {
    const [items, setItems] = useState([
        'item one',
        'item two',
        'item three',
        'item four',
        'item five',
        'item six'
    ]);
  const displayedItems = items.slice(0,6); 
    return (
        <div className="item_list">
            {displayedItems.map((item, index) => (
                <div className="listOfitems" key={index}>
                    <div className="item_number">{index + 1}</div>
                    <div className="item_description">{item}</div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;

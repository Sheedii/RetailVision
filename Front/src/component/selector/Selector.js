import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './selector.css';
import selectIcon from '../../assets/heatmap.svg';

const Selector = ({ selectedStart, selectedEnd , activeOption}) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (event) => {
        const selectedOption = event.target.value;
        console.log(selectedStart, selectedEnd);
        if (selectedOption === 'Heatmap') {
            navigate(`/htm/${selectedStart}/${selectedEnd}`);
        }
        if (selectedOption === 'Comparator') {
            navigate(`/HeatMapComparator/${selectedStart}/${selectedEnd}`);
        }
        if (selectedOption === 'Customer flow') {
            navigate(`/heatMapFlow/${selectedStart}/${selectedEnd}`);
        }
    };

    return (
        <div className='Selector'>
            <div className='selecterhtm'>
                <img src={selectIcon} alt="selectIcon" />
                <select value={activeOption} onChange={handleChange}>
                    <option value="Heatmap">Heatmap</option>
                    <option value="Comparator">Comparator</option>
                    <option value="Customer flow">Customer flow</option>
                </select>
            </div>
        </div>
    );
};

export default Selector;

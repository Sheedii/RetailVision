import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './manualTable.css';
import Loader from '../../component/loading/loading';

const ManualTable = ({ selectedItems, startDate, endDate, applyClicked , setApplyClicked }) => {
    const [percentages, setPercentages] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            if (selectedItems && startDate && endDate) {
                setLoading(true);  // Start the loader
                try {
                    // API call using axios
                    const response = await axios.post('http://127.0.0.1:8000/affinity/calculatePercentagess/', {
                        selected_items: selectedItems,
                        start_date: startDate,
                        end_date: endDate,
                    });

                    // Set the data from the response
                    setPercentages(response.data);
                    setError(null);  // Clear any previous error
                    console.log(response.data);
                } catch (err) {
                    // Handle error
                    setError(err.message);
                } finally {
                    setLoading(false);  // Stop the loader
                    setApplyClicked(false);  // Reset applyClicked after fetching
                }
            }
        };

        // Call fetchData when applyClicked is true and parameters are valid
        if (applyClicked && selectedItems && startDate && endDate) {
            fetchData();
        }
    }, [applyClicked]);

    // Render loader if loading is true
    if (loading) {
        return( <div className="AffinityLoader" ><Loader /></div> )
    }

    return (
        <div >
            <table className='ManualCorrelationTable'>
                <thead>
                    <tr>
                        <th>ITEMS</th>
                        {selectedItems.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.map((item1, rowIndex) => (
                        <tr key={item1}>
                            <td>{item1}</td>
                            {selectedItems.map((item2, colIndex) => {
                                const key1 = `${item1} / ${item2}`;
                                const key2 = `${item2} / ${item1}`;
                                const data = percentages ? (percentages[key1] || percentages[key2]) : null;
                                const percentage_a_from_b = data ? data.percentage_a_from_b : 0;
                                const percentage_b_from_a = data ? data.percentage_b_from_a : 0;

                                let displayContent;
                                if (rowIndex === colIndex) {
                                    displayContent = null;
                                } else if (rowIndex < colIndex) {
                                    displayContent = percentage_b_from_a;
                                } else {
                                    displayContent = percentage_a_from_b;
                                }

                                const cellStyle = displayContent > 50 ? {
                                    background: 'rgba(8, 7, 78, ${displayContent / 100})',
                                    border: 'none',
                                    color: '#f9f9f9'
                                } : {
                                    background: 'rgba(8, 7, 78, ${displayContent / 100})',
                                    color: '#333333'
                                };

                                return (
                                    <td
                                        key={colIndex}
                                        style={{
                                            background: `rgba(8, 7, 78, ${displayContent / 100})`,
                                            border: displayContent > 50 ? 'none' : '1px solid #8d8dae',
                                            color: displayContent > 50 ? '#f9f9f9' : '#333333'
                                        }}
                                    >
                                        {displayContent !== null ? `${displayContent.toFixed(2)} %` : null}
                                    </td>

                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManualTable;

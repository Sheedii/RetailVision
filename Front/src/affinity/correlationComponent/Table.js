import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './table.css';
import Loader from '../../component/loading/loading';

const Table = ({ selectedItem, startDate, endDate, applyClicked, setApplyClicked }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  // State to track loading

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            if (selectedItem && startDate && endDate && applyClicked) {
                setLoading(true);  // Start the loader
                try {
                    // API call using axios
                    const response = await axios.post('http://127.0.0.1:8000/affinity/topProducts/', {
                        selected_item: selectedItem,
                        start_date: startDate,
                        end_date: endDate,
                    });

                    // Set the data from the response
                    setData(response.data);
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
        if (applyClicked && selectedItem && startDate && endDate) {
            fetchData();
        }
    }, [applyClicked]);

    const topProducts = data
        .filter(item => item.product_name !== selectedItem) 
        .sort((a, b) => b.joint_ticket_count - a.joint_ticket_count); 

    const theItem = data.filter(item => item.product_name === selectedItem);

    // Render loader if loading is true
    if (loading) {
        return( <div className="AffinityLoader" ><Loader /></div> ) 
    }

    return (
        <div>
            <div>
                {theItem.length > 0 && ( // Check if there's data to avoid errors
                    theItem.map((item, index) => (
                        <div key={index} className='CorrelationfirstProd'>
                            <div className='theItemNumbers'>~{item.product_name}~</div> Appears in <div className='theItemNumbers'>~{item.joint_ticket_count}~</div> Tickets
                        </div>
                    ))
                )}
            </div>
            <table className='AutoCorrelationTable'>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Joint ticket count</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {topProducts.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product_name}</td>
                            <td>{item.joint_ticket_count}</td>
                            <td>{item.percentage} %</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

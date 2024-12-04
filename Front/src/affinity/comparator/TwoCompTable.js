import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './twoCompTable.css';
import Loader from '../../component/loading/loading';

const TwoCompTable = ({ selectedProduct1, selectedProduct2, selectedStart, selectedEnd, applyClicked, setApplyClicked }) => {
    const [productData1, setProductData1] = useState([]);
    const [productData2, setProductData2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const tableWrapperRef = useRef(null); // Ref for the scrollable table wrapper

    // Fetch data for product 1
    useEffect(() => {
        const fetchProductData = async () => {
                setLoading(true);  // Start the loader
                try {
                    // API call using axios
                    const response = await axios.post('http://127.0.0.1:8000/affinity/daily_sum/', {
                        selected_item: selectedProduct1,
                        start_date: selectedStart,
                        end_date: selectedEnd,
                    });

                    // Set the data from the response
                    setProductData1(response.data);
                    console.log(response.data);
                } catch (err) {
                    console.error('Error fetching data:', err);
                } finally {
                    setLoading(false);  // Stop the loader
                    setApplyClicked(false);  // Reset applyClicked after fetching
                }
        };
        if (applyClicked && selectedProduct1 && selectedStart && selectedEnd) {
            fetchProductData();
        }
    }, [applyClicked]);

    // Fetch data for product 2
    useEffect(() => {
        const fetchProductData = async () => {
                setLoading(true);  // Start the loader
                try {
                    // API call using axios
                    const response = await axios.post('http://127.0.0.1:8000/affinity/daily_sum/', {
                        selected_item: selectedProduct2,
                        start_date: selectedStart,
                        end_date: selectedEnd,
                    });

                    // Set the data from the response
                    setProductData2(response.data);
                    console.log(response.data);
                } catch (err) {
                    console.error('Error fetching data:', err);
                } finally {
                    setLoading(false);  // Stop the loader
                    setApplyClicked(false);  // Reset applyClicked after fetching
                }
        };
        if (applyClicked && selectedProduct1 && selectedStart && selectedEnd) {
            fetchProductData();
        }
    }, [applyClicked]);

    // Function to merge data by date for the two products
    const mergedData = productData1.map((prod1Data) => {
        const prod2Data = productData2.find((item) => item.date === prod1Data.date);
        return {
            date: prod1Data.date,
            quantity1: prod1Data.quantity,
            quantity2: prod2Data ? prod2Data.quantity : 0,
            revenue1: prod1Data.revenue,
            revenue2: prod2Data ? prod2Data.revenue : 0,
            ticketsNumber1: prod1Data.ticketsNumber,
            ticketsNumber2: prod2Data ? prod2Data.ticketsNumber : 0,
        };
    });

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (tableWrapperRef.current) {
                const { scrollTop } = tableWrapperRef.current;
                // If scrolled down more than 50px, change class, else revert it
                setIsScrolled(scrollTop >= 100);
            }
        };

        const tableWrapper = tableWrapperRef.current;
        if (tableWrapper) {
            tableWrapper.addEventListener('scroll', handleScroll);
        }

        // Clean up event listener on unmount
        return () => {
            if (tableWrapper) {
                tableWrapper.removeEventListener('scroll', handleScroll);
            }
        };
    }, [applyClicked]);

    if (loading) {
        return( <div className="AffinityLoader" ><Loader /></div> )
    }

    return (
        <div className="two_comp_table">
            <div className='ComparatorTableContainer'>          
                <div className="ComparatorTableTableWrapper" ref={tableWrapperRef}>
                     <div className={isScrolled ? 'blakaa' : 'notblakaa'}></div>
                    <table className='ComparatorTableHeader'>
                        <thead>
                            <tr>
                                <th></th>
                                <th colSpan="2">Daily Quantity</th>
                                <th colSpan="2">Daily Revenue (dt)</th>
                                <th colSpan="2">Daily Tickets</th>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <th>Product 1</th>
                                <th>Product 2</th>
                                <th>Product 1</th>
                                <th>Product 2</th>
                                <th>Product 1</th>
                                <th>Product 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mergedData.map((row) => (
                                <tr key={row.date}>
                                    <td>{row.date}</td>
                                    <td className={row.quantity1 > row.quantity2 ? 'GreenCase' : 'RedCase'}>{row.quantity1}</td>
                                    <td className={row.quantity2 > row.quantity1 ? 'GreenCase' : 'RedCase'}>{row.quantity2}</td>
                                    <td className={row.revenue1 > row.revenue2 ? 'GreenCase' : 'RedCase'}>{row.revenue1}</td>
                                    <td className={row.revenue2 > row.revenue1 ? 'GreenCase' : 'RedCase'}>{row.revenue2}</td>
                                    <td className={row.ticketsNumber1 > row.ticketsNumber2 ? 'GreenCase' : 'RedCase'}>{row.ticketsNumber1}</td>
                                    <td className={row.ticketsNumber2 > row.ticketsNumber1 ? 'GreenCase' : 'RedCase'}>{row.ticketsNumber2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TwoCompTable;

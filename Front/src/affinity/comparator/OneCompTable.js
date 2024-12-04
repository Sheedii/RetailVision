import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './twoCompTable.css';
import Loader from '../../component/loading/loading';

const OneCompTable = ({ selectedProduct, selectedStart1, selectedEnd1, selectedStart2, selectedEnd2, applyClicked, setApplyClicked }) => {
    const [productData1, setProductData1] = useState([]);
    const [productData2, setProductData2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const tableWrapperRef = useRef(null);

    // Fetch data for product 1
    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://127.0.0.1:8000/affinity/daily_sum/', {
                    selected_item: selectedProduct,
                    start_date: selectedStart1,
                    end_date: selectedEnd1,
                });
                setProductData1(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
                setApplyClicked(false);
            }
        };
        if (applyClicked && selectedProduct && selectedStart1 && selectedEnd1) {
            fetchProductData();
        }
    }, [applyClicked]);

    // Fetch data for product 2
    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://127.0.0.1:8000/affinity/daily_sum/', {
                    selected_item: selectedProduct,
                    start_date: selectedStart2,
                    end_date: selectedEnd2,
                });
                setProductData2(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        if (applyClicked && selectedProduct && selectedStart2 && selectedEnd2) {
            fetchProductData();
        }
    }, [applyClicked]);

    // Determine which dataset is longer
    const maxLength = Math.max(productData1.length, productData2.length);

    // Merge the data row by row, based on the longest table
    const mergedData = Array.from({ length: maxLength }).map((_, index) => {
        const prod1Data = productData1[index] || {};
        const prod2Data = productData2[index] || {};

        return {
            date1: prod1Data.date || '---',
            date2: prod2Data.date || '---',
            quantity1: prod1Data.quantity || 0,
            quantity2: prod2Data.quantity || 0,
            revenue1: prod1Data.revenue || 0,
            revenue2: prod2Data.revenue || 0,
            ticketsNumber1: prod1Data.ticketsNumber || 0,
            ticketsNumber2: prod2Data.ticketsNumber || 0,
        };
    });

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (tableWrapperRef.current) {
                const { scrollTop } = tableWrapperRef.current;
                setIsScrolled(scrollTop >= 100);
            }
        };

        const tableWrapper = tableWrapperRef.current;
        if (tableWrapper) {
            tableWrapper.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (tableWrapper) {
                tableWrapper.removeEventListener('scroll', handleScroll);
            }
        };
    }, [applyClicked]);

    // Render loader if loading is true
    if (loading) {
        return( <div className="AffinityLoader" ><Loader /></div> )
    }

    return (
        <div className="two_comp_table">
            <div className="ComparatorTableContainer">
                <div className="ComparatorTableTableWrapper" ref={tableWrapperRef}>
                    <div className={isScrolled ? 'blakaa' : 'notblakaa'}></div>
                    <table className="OneComparatorTableHeader">
                        <thead>
                            <tr>
                                <th></th>
                                <th colSpan="2">Daily Quantity</th>
                                <th colSpan="2">Daily Revenue</th>
                                <th colSpan="2">Daily Tickets</th>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <th>Period 1</th>
                                <th>Period 2</th>
                                <th>Period 1</th>
                                <th>Period 2</th>
                                <th>Period 1</th>
                                <th>Period 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mergedData.map((row, index) => (
                                <tr key={index}>
                                    <td className="DateRow">
                                        <div>{row.date1}</div> <div>{row.date2}</div>
                                    </td>
                                    <td className={row.quantity1 > row.quantity2 ? 'GreenCase' : 'RedCase'}>
                                        {row.quantity1}
                                    </td>
                                    <td className={row.quantity2 > row.quantity1 ? 'GreenCase' : 'RedCase'}>
                                        {row.quantity2}
                                    </td>
                                    <td className={row.revenue1 > row.revenue2 ? 'GreenCase' : 'RedCase'}>
                                        {row.revenue1}
                                    </td>
                                    <td className={row.revenue2 > row.revenue1 ? 'GreenCase' : 'RedCase'}>
                                        {row.revenue2}
                                    </td>
                                    <td className={row.ticketsNumber1 > row.ticketsNumber2 ? 'GreenCase' : 'RedCase'}>
                                        {row.ticketsNumber1}
                                    </td>
                                    <td className={row.ticketsNumber2 > row.ticketsNumber1 ? 'GreenCase' : 'RedCase'}>
                                        {row.ticketsNumber2}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OneCompTable;

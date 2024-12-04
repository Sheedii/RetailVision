import React, { useState, useEffect } from 'react';
import './productCards.css';
import axios from 'axios';

const ProductCards = ({ selectedProduct1, selectedProduct2, selectedStart, selectedEnd, applyClicked }) => {
    const [quantityProduct1, setQuantityProduct1] = useState(null);
    const [quantityProduct2, setQuantityProduct2] = useState(null);
    const [cAProduct1, setCAProduct1] = useState(null);
    const [cAProduct2, setCAProduct2] = useState(null);
    const [ticketsNumProduct1, setTicketsNumProduct1] = useState(null);
    const [ticketsNumProduct2, setTicketsNumProduct2] = useState(null);

    // State variables to hold the width percentages
    const [caWidth, setCAWidth] = useState({ product1Width: '0%', product2Width: '0%' });
    const [quantityWidth, setQuantityWidth] = useState({ product1Width: '0%', product2Width: '0%' });
    const [ticketsWidth, setTicketsWidth] = useState({ product1Width: '0%', product2Width: '0%' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/affinity/product_sum/', {
                    selected_item: selectedProduct1,
                    start_date: selectedStart,
                    end_date: selectedEnd,
                });
                setQuantityProduct1(response.data.Quantity_sum);
                setCAProduct1(response.data.Revenue_sum);
                setTicketsNumProduct1(response.data.ticketsNumber);

                const response2 = await axios.post('http://127.0.0.1:8000/affinity/product_sum/', {
                    selected_item: selectedProduct2,
                    start_date: selectedStart,
                    end_date: selectedEnd,
                });
                setQuantityProduct2(response2.data.Quantity_sum);
                setCAProduct2(response2.data.Revenue_sum);
                setTicketsNumProduct2(response2.data.ticketsNumber);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (selectedProduct1 && selectedStart && selectedEnd && selectedProduct2) {
            fetchData();
        }
    }, [applyClicked]);

    // Function to calculate the dynamic width percentage for the progress bars
    const calculateWidthPercentage = (value1, value2) => {
        if (value1 === null || value2 === null) {
            return { product1Width: '0%', product2Width: '0%' };
        }
        const max = Math.max(value1, value2);
        if (max === 0) {
            return { product1Width: '0%', product2Width: '0%' };
        }
        const product1Width = `${(value1 / max) * 100}%`;
        const product2Width = `${(value2 / max) * 100}%`;
        return { product1Width, product2Width };
    };

    // Calculate width for each category when data changes
    useEffect(() => {
        setCAWidth(calculateWidthPercentage(cAProduct1, cAProduct2));
        setQuantityWidth(calculateWidthPercentage(quantityProduct1, quantityProduct2));
        setTicketsWidth(calculateWidthPercentage(ticketsNumProduct1, ticketsNumProduct2));
    }, [cAProduct1, cAProduct2, quantityProduct1, quantityProduct2, ticketsNumProduct1, ticketsNumProduct2]);

    return (
        <div className='ProductCardsContainer'>
            <div className='Card'>
                <div className="salesFigures">Products Total Quantity</div>
                <div className='barsprog'>
                    <div className='FirstProgress'>
                        <div className='ProgressTitle'>Product 1</div>
                        <div className='progressBar'>
                            <div className={quantityProduct1 > quantityProduct2 ? "numberofprogress" : "numberofprogress2"}
                                style={{ width: quantityWidth.product1Width }} >{quantityProduct1}</div>
                            <div className="progressContainer">
                                <div
                                    className={quantityProduct1 > quantityProduct2 ? "progressvert" : "progressrouge"}
                                    style={{ width: quantityWidth.product1Width }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className='FirstProgress'>
                        <div className='ProgressTitle'>Product 2</div>
                        <div className='progressBar'>
                            <div className={quantityProduct2 > quantityProduct1 ? "numberofprogress" : "numberofprogress2"}
                                style={{ width: quantityWidth.product2Width }} >{quantityProduct2}</div>
                            <div className="progressContainer">
                                <div
                                    className={quantityProduct2 > quantityProduct1 ? "progressvert" : "progressrouge"}
                                    style={{ width: quantityWidth.product2Width }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Card'>
                <div className="salesFigures">Products Total Revenue</div>
                <div className='barsprog'>
                    <div className='FirstProgress'>
                        <div className='ProgressTitle'>Product 1</div>
                        <div className='progressBar'>
                            <div className={cAProduct1 > cAProduct2 ? "numberofprogress" : "numberofprogress2"}
                                style={{ width: caWidth.product1Width }}>{cAProduct1} Dt</div>
                            <div className="progressContainer">
                                <div
                                    className={cAProduct1 > cAProduct2 ? "progressvert" : "progressrouge"}
                                    style={{ width: caWidth.product1Width }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className='FirstProgress'>
                        <div className='ProgressTitle'>Product 2</div>
                        <div className='progressBar'>
                            <div className={cAProduct2 > cAProduct1 ? "numberofprogress" : "numberofprogress2"}
                                style={{ width: caWidth.product2Width }}>{cAProduct2} Dt</div>
                            <div className="progressContainer">
                                <div
                                    className={cAProduct2 > cAProduct1 ? "progressvert" : "progressrouge"}
                                    style={{ width: caWidth.product2Width }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Card'>
                <div className="salesFigures">Tickets Total Number</div>
                <div className='barsprog'>
                    <div className='FirstProgress'>
                        <div className='ProgressTitle'>Product 1</div>
                        <div className='progressBar'>
                            <div className={ticketsNumProduct1 > ticketsNumProduct2 ? "numberofprogress" : "numberofprogress2"}
                                style={{ width: ticketsWidth.product1Width }}>{ticketsNumProduct1}</div>
                            <div className="progressContainer">
                                <div
                                    className={ticketsNumProduct1 > ticketsNumProduct2 ? "progressvert" : "progressrouge"}
                                    style={{ width: ticketsWidth.product1Width }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className='FirstProgress'>
                        <div className='ProgressTitle'>Product 2</div>
                        <div className='progressBar'>
                            <div className={ticketsNumProduct2 > ticketsNumProduct1 ? "numberofprogress" : "numberofprogress2"}
                                style={{ width: ticketsWidth.product2Width }}>{ticketsNumProduct2}</div>
                            <div className="progressContainer">
                                <div
                                    className={ticketsNumProduct2 > ticketsNumProduct1 ? "progressvert" : "progressrouge"}
                                    style={{ width: ticketsWidth.product2Width }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCards;

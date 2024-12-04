import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './secondPriceIndexTable.css';
import Loader from '../../component/loading/loading'

const SecondPriceIndexTable = ({ filters, articles, applyClicked, setApplyClicked }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState({});

    useEffect(() => {
        const fetchTableData = async () => {
            if (filters && articles && articles.length > 0) { // Ensure filters and articles are available
                setLoading(true);
                setError(null);
                let allTableData = {};

                try {
                    for (let article of articles) {
                        let updatedFilters = { ...filters, article };
                        console.log("Applying filters:", updatedFilters);

                        const response = await axios.post('http://localhost:8000/pivot-filtered-data/', updatedFilters);
                        const data = response.data;
                        allTableData[article] = data[article];
                        console.log('Filtered Data:', data);
                    }

                    setTableData(allTableData);
                    console.log('Complete Table Data:', allTableData);
                } catch (error) {
                    console.error('Error fetching filtered data:', error);
                    setError('Failed to load filtered data.');
                } finally {
                    setLoading(false);
                    setApplyClicked(false);
                }
            }
        };

        if (applyClicked) {
            fetchTableData();
        }
    }, [applyClicked]); // Dependency array ensures this runs when filters or articles change


    if (error) return <div>{error}</div>;

    if (loading) {
        return (<div className="AffinityLoader" ><Loader /></div>)
    }

    return (
        <div className="PriceTableContainer">
            <div className="priceTableTableWrapper">
                <table>
                    <thead >
                        <tr>
                            <th style={{ width: '250px' }}>Etiquettes de ligne</th>
                            <th># article</th>
                            <th>CA TTC</th>
                            <th>Ind Prix P3</th>
                            <th>Couverture P3</th>
                            <th>Ind Prix <br /> concurrent min</th>
                            <th>Couverture <br /> Concurrent min</th>
                            <th>Ind Prix VS CRF <br /> Market</th>
                            <th>Couverture CRF <br /> Market</th>
                            <th>Ind Prix CRF <br /> Hyper</th>
                            <th>Couverture CRF <br /> Hyper</th>
                            <th>Ind Prix <br /> Monoprix</th>
                            <th>Couverture <br /> Monoprix</th>
                            <th>Ind Prix Aziza</th>
                            <th>Couverture <br /> Aziza</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={index}>
                                <td>{tableData[article]?.["Article"]}</td>
                                <td>{tableData[article]?.["# articles"]}</td>
                                <td>{tableData[article]?.["CA TTC"]}</td>
                                <td>{tableData[article]?.["Ind PrixP3"]}</td>
                                <td>{tableData[article]?.["Couverture P3"]}</td>
                                <td>{tableData[article]?.["Ind Prix concurrent min"]}</td>
                                <td>{tableData[article]?.["Couverture concurrent min"]}</td>
                                <td>{tableData[article]?.["Ind Prix Carrefour Market"]}</td>
                                <td>{tableData[article]?.["Couverture Carrefour Market"]}</td>
                                <td>{tableData[article]?.["Ind Prix Carrefour Hyper"]}</td>
                                <td>{tableData[article]?.["Ind Prix Carrefour Hyper"]}</td>
                                <td>{tableData[article]?.["Ind Prix Monoprix"]}</td>
                                <td>{tableData[article]?.["Ind Prix Monoprix"]}</td>
                                <td>{tableData[article]?.["Ind Prix Aziza"]}</td>
                                <td>{tableData[article]?.["Ind Prix Aziza"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SecondPriceIndexTable;

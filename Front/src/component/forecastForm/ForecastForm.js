import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { saveAs } from 'file-saver';
import Select from 'react-select';
import Search from '../searchBar/SearchBar.js'


const ForecastForm = () => {
    const [selectedItem, setSelectedItem] = useState("");
    const [forecastValues, setForecastValues] = useState([]);
    const [forecastDates, setForecastDates] = useState([]);
    const [actualDates, setActualDates] = useState([]);
    const [validationData, setValidationData] = useState([]);
    const [showForecastResults, setShowForecastResults] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);



    const handleSelectItem = SelectItem => {
        setSelectedItem(SelectItem);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        axios.get('http://localhost:5000/get_items')
            .then(response => {
                setItems(response.data.items);
            })
            .catch(error => console.error('Error fetching items:', error));
    };


    const handleExport = () => {
        const dataToExport = {
            forecastDates: forecastDates,
            actualDates: actualDates,
            forecastValues: forecastValues,
            validationData: validationData
        };
        const blob = new Blob([JSON.stringify(dataToExport)], { type: 'application/json' });
        saveAs(blob, 'forecast_results.json');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedItem !== '') {
            try {
                const response = await axios.post('http://localhost:5000/forecast', { selected_item: selectedItem });
                setForecastValues(response.data.forecast_values);
                setForecastDates(response.data.forecast_dates);
                setActualDates(response.data.dates);
                setValidationData(response.data.validation_data);
                setShowForecastResults(true);
            } catch (error) {
                console.error('Error forecasting:', error);
            }
        }
    };

    useEffect(() => {
        if (showForecastResults) {
            const chartDom = document.getElementById('forecast-chart');
            const myChart = echarts.init(chartDom);

            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Forecast', 'Actual Data', 'Confidence Band']
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [...actualDates.slice(-60), ...forecastDates]
                },
                yAxis: {
                    type: 'value'
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                    {
                        start: 0,
                        end: 100
                    }
                ],
                series: [
                    {
                        name: 'Forecast',
                        type: 'line',
                        data: [...Array(60).fill(null), ...forecastValues],
                        itemStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    {
                        name: 'Actual Data',
                        type: 'line',
                        data: validationData.slice(-60),
                        itemStyle: {
                            color: 'rgba(8, 7, 78, 1)'
                        }
                    },
                    {
                        name: 'Confidence Band',
                        type: 'line',
                        data: showForecastResults ? [...Array(60).fill(null), ...forecastValues.map((value, index) => value + 1)] : [],
                        lineStyle: {
                            opacity: 0
                        },
                        areaStyle: {
                            color: 'rgba(8, 7, 78, 1)'
                        },
                        symbol: 'none'
                    },
                    {
                        name: 'Confidence Band',
                        type: 'line',
                        data: showForecastResults ? [...Array(60).fill(null), ...forecastValues.map((value, index) => value - 1)] : [],
                        lineStyle: {
                            opacity: 0
                        },
                        areaStyle: {
                            color: 'rgba(8, 7, 78, 1)'
                        },
                        symbol: 'none'
                    }
                ]
            };

            option && myChart.setOption(option);
        }
    }, [showForecastResults, forecastValues, forecastDates, validationData, actualDates]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', backgroundColor: '#d9dfee', paddingBottom: '50px' }}>
            <div style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: '#fff',
                width: showForecastResults ? '80%' : '40%',
                height: showForecastResults ? '100%' : '40%',
                transition: 'width 0.5s, height 0.5s',
                textAlign: 'center'
            }}>
                {!showForecastResults && (
                    <form style={{ marginBottom: '20px' }} onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginRight: '10px', color: '#08074E', fontWeight: '600', fontSize: '26px' }} htmlFor="selected-item">Select Product</label>
                            <p style={{ color: 'grey', fontSize: '12px' }}>Please choose one product</p>
                            <br />
                            <br />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="ComparatorSearch">
                                    <Search className="searchlist" onSelectItem={handleSelectItem} />
                                </div>

                                <button style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#08074E', color: '#FDFDFD', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type="submit">Forecast</button>
                            </div>
                        </div>
                    </form>
                )}
                {showForecastResults && (
                    <div style={{ flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <button style={{
                                backgroundColor: '#08074E',
                                color: '#FDFDFD',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }} onClick={() => setShowForecastResults(false)}>Change Products</button>
                            <button style={{
                                padding: '2px 8px',
                                backgroundColor: '#08074E',
                                color: '#FDFDFD',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }} onClick={handleExport}>Export</button>
                        </div>
                        <h2 style={{ color: '#08074E', marginBottom: '20px' }}>Forecast Results</h2>
                        <h4>{selectedItem}</h4>
                        <div id="forecast-chart" style={{ width: '100%', height: '400px', justifyContent: 'center', display: 'flex' }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForecastForm;

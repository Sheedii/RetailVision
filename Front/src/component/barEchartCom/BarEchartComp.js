import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './barEchartComp.css';
import selectIcon from "../../assets/pourcentage.svg";

const BarEchartComp = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = echarts.init(chartRef.current);

        const option = {
            title: {
                text: 'Number of visitors', // Set the title text
                textStyle: {
                    color: '#08074E', // Set the title color
                    fontSize: 10, // Set the title font size
                    fontWeight: 'bold', // Set the title font weight
                },
                left: 'center', // Align title to the center
                top: '10%', // Adjust top position as needed
            },
            color: "#08074E",
            axisPointer: {
                lineStyle: {
                    color: "#08074E"
                }
            },
            grid: {
                left: '20%',
                right: '3%',
                bottom: '10%',
                top: '20%',
                containLabel: true,
                borderColor: '#08074E',
                borderWidth: 1,
                borderLeft: false, // Remove left border
            },
            xAxis: {
                type: 'category',
                data: ['February 20', 'February 22'],
                axisLine: {
                    lineStyle: {
                        color: "#08074E"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#08074E"
                },
                splitLine: {
                    show: false // Remove vertical grid lines
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: "#08074E",
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#08074E",
                    formatter: '{value}k' // Add 'K' after the value
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#08074E",
                        type: 'solid'
                    }
                }
            },
            series: [
                {
                    data: [8, 5],
                    type: 'bar',
                    barWidth: '35px',
                    itemStyle: {
                        borderRadius: [5, 5, 0, 0],
                    },
                }
            ]
        };

        myChart.setOption(option);

        // Clean up
        return () => {
            myChart.dispose();
        };
    }, []);

    return (
        <div className='chartbar'>
            <div className='mychart22'>
                {/* First Row */}
                <div className="row title-row">
                    <h2 className="chartTitle">Average results</h2>
                </div>
                {/* Second Row */}
                <div className="row chart-row">
                    <div ref={chartRef} className="echart-container22" />
                    <div className='pourcentage'>
                        <h3>Percentage decrease</h3>
                        <div className="percentage">
                            <img src={selectIcon} alt="select icon" />
                            <span>= 52.79%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarEchartComp;

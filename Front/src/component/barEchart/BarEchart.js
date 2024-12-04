import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './barEchart.css'
import selectIcon from "../../assets/footPrint.svg";

const BarEchart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = echarts.init(chartRef.current);

        const option = {
            color: "#08074E",
            axisPointer: {
                lineStyle: {
                    color: "#08074E"
                }
            },
            xAxis: {
                type: 'category',
                data: ['Rayon1', 'Rayon2', 'Rayon3', 'Rayon4', 'Rayon5', 'Rayon6', 'Rayon7'],
                axisLine: {
                    lineStyle: {
                        color: "#08074E" 
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: "#08074E", // Set the color of the y-axis lines
                    }
                }
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
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
            <div className='barTitle'>
                <div className='barIcon'>
                    <img src={selectIcon} alt="selectIcon" />
                    <div className='PrintHeatmap'>Zone Visits</div>
                </div>
                <div className='footPrintDate'>February 20, 2024 12:35 PM</div>
            </div>

            <div className='weekSelection'>
                <select >
                    <option value="lastWeek">Last Week</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="lastWeek">Last Week</option>
                </select>
            </div>
            <div className='mychart'>
                <div ref={chartRef} className="echart-container" />
            </div>
        </div>
    )
};

export default BarEchart

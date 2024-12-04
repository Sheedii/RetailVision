import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './comparatorStat.css';
import Down from '../../assets/down.svg';
import Up from '../../assets/percentageUp.svg';

const ComparatorStat = () => {

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
                data: ['Map 1', 'Map 2'],
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
                    data: [120, 230],
                    type: 'bar',
                    barWidth: '55px',

                    itemStyle: {
                        borderRadius: [5, 5, 0, 0],
                    },
                }
            ]
        };

        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, []);

    return (
            <div className='Statistics'>
                <div className='chartPart'>
                    <div class="ChartTitle">Number of Visitors</div>
                    <div ref={chartRef} className="echartContainer" />
                </div>
                <div className='statisticsNumbers'>
                    <div className='statisticNumbers'>
                        <div class="percentageTitle">Percentage</div>
                        {/*<div className='percentageRed'> <img className='Down' src={Down} alt="Down" /> ≈ 55.79%</div>*/}
                        <div className='percentageGreen'> <img className='Up' src={Up} alt="Up" /> ≈ 55.79%</div>
                    </div>
                </div>
            </div>
    )
}

export default ComparatorStat
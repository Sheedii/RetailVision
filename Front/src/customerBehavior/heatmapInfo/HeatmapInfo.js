import React, { useState, useEffect } from 'react';
import './heatmapInfo.css';
import speedMeterImage from '../../assets/speed_meter.svg';

const HeatmapInfo = ({Date1 , Date2}) => {
    const [totalVisitors, setTotalVisitors] = useState(0);



    useEffect(() => {
        generateRandomNumber();
    }, []);



    const generateRandomNumber = () => {
        const newRandomNumber = Math.floor(Math.random() * 1001);
        setTotalVisitors(newRandomNumber);
    };

    return (
        <div className="heatmapInfocontainer">
            <div className="heatmapInfoPart1" id="datetime">
            <div>{Date1}</div>
            <div>{Date2}</div>
            </div>
            <div className="heatmapInfoline1"></div>
            <div className="heatmapInfoPart2"> Filters : Undefined</div>
            <div className="heatmapInfoline2"></div>

            <div className="heatmapInfoPart3">
                <div>Total Visitors</div>
                <div className='heatmapInfoCompteur'>{totalVisitors}</div>
            </div>

            <div className="heatmapInfoline3"></div>

            <div className="heatmapInfoPart4">
                <div>less</div>
                <div className='hexagons'>
                    <div className='visitorsNumber'>
                        <div className="hexagon grey"></div>
                        0 - {Math.round(totalVisitors * 0.2)}
                    </div>
                    <div className='visitorsNumber'>
                        <div className="hexagon green"></div>
                        {Math.round(totalVisitors * 0.2)} - {Math.round(totalVisitors * 0.4)}
                    </div>
                    <div className='visitorsNumber'>
                        <div className="hexagon yellow"></div>
                        {Math.round(totalVisitors * 0.4)} - {Math.round(totalVisitors * 0.6)}
                    </div>
                    <div className='visitorsNumber'>
                        <div className="hexagon orange"></div>
                        {Math.round(totalVisitors * 0.6)} - {Math.round(totalVisitors * 0.8)}
                    </div>
                    <div className='visitorsNumber'>
                        <div className="hexagon red"></div>
                        {Math.round(totalVisitors * 0.8)} - {totalVisitors}
                    </div>
                </div>
                <div>more</div>
            </div>
        </div>
    );
}

export default HeatmapInfo
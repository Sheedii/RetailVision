import React, { useState, useEffect } from 'react';
import './mapInfo3.css';
import speedMeterImage from '../../assets/speed_meter.svg';

const MapInfo3 = () => {
    const [randomNumber, setRandomNumber] = useState(0);

    useEffect(() => {
        generateRandomNumber();
    }, []);

    useEffect(() => {
        const svg = document.getElementById('mySvg');
        const randomDegree = -(randomNumber / 1001) * 180;
        svg.style.transform = 'rotate(' + randomDegree + 'deg)';
    }, [randomNumber]);

    const generateRandomNumber = () => {
        const newRandomNumber = Math.floor(Math.random() * 1001);
        setRandomNumber(newRandomNumber);
    };

    return (
        <div className="rectangle-containerComp">
            <div className="rectangle00"></div>
            
            <div className="line1"></div>

            <div className="line2"></div>
            <div className="line03"></div>
            <div className="partComp part1" id="datetime"></div>
            <div className="partComp part2"></div>
            <div className="partComp part3">
                <div className="fonta">Total Visitors</div>
                <div className="fonta" id="randomNumber">{randomNumber}</div>
                <div className="meterComp">
                    <img src={speedMeterImage} alt="Speed Meter" />
                    <svg style={{ position: "relative", left: "-32px" }} id="mySvg" width="17" height="16" viewBox="0 0 17 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.9806 5.47228C10.8843 5.47228 10.7886 5.47535 10.6932 5.48033L1.62471 0.269398C1.40275 0.14166 1.12096 0.173649 0.935007 0.347359C0.748902 0.520923 0.704254 0.793822 0.825568 1.01504L5.77245 10.045C5.75426 10.2189 5.74456 10.3945 5.74456 10.5716C5.74456 11.9338 6.2892 13.2143 7.27812 14.1775C8.26712 15.1407 9.58203 15.6711 10.9807 15.6711C12.3793 15.6711 13.6941 15.1405 14.6831 14.1775C15.6721 13.2143 16.2166 11.9338 16.2166 10.5716C16.2166 9.20949 15.672 7.92895 14.6831 6.96583C13.6941 6.0027 12.3792 5.47228 10.9806 5.47228Z"
                            fill="#F3F5FA" transform="rotate(135 8.6083 8)" />
                    </svg>
                </div>
            </div>
            <div className="part part4">
                <div className="writing">less</div>
                <div className="hexagonComp grey"></div>
                <div className="hexagonComp green"></div>
                <div className="hexagonComp yellow"></div>
                <div className="hexagonComp orange"></div>
                <div className="hexagonComp red"></div>
                <div className="writing">more</div>
            </div>
        </div>
    );
}

export default MapInfo3;

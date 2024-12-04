import React, { useState } from 'react';
import './heatmapCom.css'
import { useNavigate } from 'react-router-dom';
import selectIcon from '../../assets/heatmap.svg';
import Agenda from '../heatmapTime/HeatmapTime';
import Map from '../heatmap/HeatMap'
const HeatmapCom = () => {

    const [selectedDate, setSelectedDate] = useState();
    const [selectedDate2, setSelectedDate2] = useState();
    const [applyClicked, setApplyClicked] = useState(false);
    const navigate = useNavigate();


    const handleApplyButtonClick = () => {
        setApplyClicked(true);
        console.log(selectedDate)
        console.log(selectedDate2)
    };

    const handleNavigate = () => {
        navigate('/HeatMapComparator');
    };

    const handleNavigateTopTen = () => {
        navigate('/Top10');
    };

    return (
        <div className='HeatmapCom'>
            <div className='HeatmapContainer'>
                <div className='correlationpageChangerButtons'>
                    <div className='correlationpageChanger'>HeatMap</div>
                </div>
                <div className="GoToComparatorButtons" onClick={handleNavigate}>Comparator</div>
                <div className="GoToTopTenButtons" /*onClick={handleNavigateTopTen}*/>Common Path</div>
                <div className='ComponentHeader'>
                    <div className='comTitle'>
                        <img src={selectIcon} alt="selectIcon" />
                        HeatMap
                    </div>
                    <div className='selectTime'>
                        <div className='titleTime'>Time Line :</div>
                        From
                        <Agenda onDateChange={setSelectedDate} />
                        to
                        <Agenda onDateChange={setSelectedDate2} />

                        <div className='heatmapapply'>
                            <button className='ComparatorApply' onClick={handleApplyButtonClick}>Apply</button>
                        </div>
                    </div>

                </div>

                <div className='MapDiv'>
                    <Map mapId="map" Date1={selectedDate} Date2={selectedDate2} applyClicked={applyClicked} setApplyClicked={setApplyClicked}/>
                </div>
            </div>
        </div>
    )
}

export default HeatmapCom
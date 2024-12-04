import React, { useState } from 'react';
import './pathCom.css'
import { useNavigate } from 'react-router-dom';
import selectIcon from '../../assets/heatmap.svg';
import Agenda from '../heatmapTime/HeatmapTime';
import Map from '../heatmap/HeatMap'

const PathCom = () => {
    const [selectedDate, setSelectedDate] = useState();
    const [selectedDate2, setSelectedDate2] = useState();
    const [applyClicked, setApplyClicked] = useState(false);
    const navigate = useNavigate();


    const handleApplyButtonClick = () => {
        setApplyClicked(true);
    };

    const handleNavigate = () => {
        navigate('/Comprator2');
    };

    const handleNavigateTopTen = () => {
        navigate('/Top10');
    };

    return (
        <div className='HeatmapCom'>
            <div className='HeatmapContainer'>
                <div className='TopTenPageChangerButtons'>
                    <div className='ComparatorpageChanger'>Common Path</div>
                </div>
                <div className="correlationPageNavigateButtons" onClick={handleNavigate}>HeatMap</div>
                <div className="GoToComparatorButtonsTop" onClick={handleNavigateTopTen}>Comparator</div>
                <div className='ComponentHeader'>
                    <div className='comTitle'>
                        <img src={selectIcon} alt="selectIcon" />
                        Most Common Path
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
                    <Map Date1={setSelectedDate} Date2={setSelectedDate2} />
                </div>
            </div>
        </div>
    )
}

export default PathCom
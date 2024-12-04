import React, { useState } from 'react'
import './timeLine.css'
import { useNavigate } from 'react-router-dom'; 
import Agenda from '../agenda2/Agenda2';

const TimeLine = () => {

    const navigate = useNavigate(); 
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);
    

    const handleApplyButtonClick = () => {
        navigate(`/htm/${selectedStart}/${selectedEnd}`); // Update to use URL parameters
    };

    return (
        <div className='selectTimeDiv'>
            <div className="SelectTime">
                <div className="selectTimeLine">Select Timeline</div>
                <Agenda onStartDateChange={setSelectedStart} onEndDateChange={setSelectedEnd} />
                <div className="agendaButtons2">
                    <button className='Apply0' onClick={handleApplyButtonClick}>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default TimeLine

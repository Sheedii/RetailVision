import React from 'react';
import './heatMapComparatorBox.css'
import Refresh from "../../assets/refresh.svg";
import Change from "../../assets/changeIcon.svg";
import Map2 from '../map2/Map2';
import Filters from '../../containers/filters/Filters';
import Selector from '../selector/Selector'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Agenda from '../agenda2/Agenda2';
import {Map3} from "../index";

const HeatMapComparatorBox = ({ start, end }) => {
    const navigate = useNavigate();
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [showAgenda, setShowAgenda] = useState(true);

    const handleChangeButtonClick = () => {
        navigate(`/TimeLine`);
    };
    const handleApplyButtonClicks = () => {
        setShowMap(true); // Set showMap to true when Apply button is clicked
        navigate(`/cmprt/${selectedStart}/${selectedEnd}`); // Update to use URL parameters

    };

    return (
        <>
            <div className='HeatMapContainer0'>
                <div className='HeatMapContainer1'>
                    <div className='filtersChange'>
                        <button type="button" className="changeButton" onClick={handleChangeButtonClick}>
                            <img src={Change} alt="change Time Line" />
                            Change Timeline
                        </button>
                        <Filters />
                    </div>
                    <div className='box0'>
                        <Selector selectedStart={start} selectedEnd={end} activeOption="Comparator" />
                        <div className='boxHeatMap'>
                            <div className='refresh'>
                                <button type="button" className="refreshButton">
                                    Data Refreshed
                                    <img src={Refresh} alt="RefreshIcon" />
                                </button>
                            </div>
                            <div className='CFB'>
                                
                            </div>
                            <div className='compa1'>
                                <div className="SelectTime">
                                    <div className="selectTimeLine">Select Timeline</div>
                                    {/* Conditional rendering based on showMap state */}
                                    {showMap ? (
                                        <Map3 />
                                    ) : (
                                        <Agenda
                                            onStartDateChange={setSelectedStart}
                                            onEndDateChange={setSelectedEnd}
                                        />
                                    )}
                                    <div className="agendaButtons2">
                                        <button className='Apply0' onClick={handleApplyButtonClicks}>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeatMapComparatorBox

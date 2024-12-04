import React, { useState, useEffect } from 'react';
import './heatMapBox.css';
import selectIcon from "../../assets/heatmap.svg";
import Refresh from "../../assets/refresh.svg";
import Change from "../../assets/changeIcon.svg";
import Map2 from '../../customerBehavior/heatmap/HeatMap';
import Filters from '../../containers/filters/Filters';
import Agenda from '../agenda2/Agenda2';
import FootPrint from '../footPrint/FootPrint';
import BarEchart from '../barEchart/BarEchart';
import Selector from '../selector/Selector'
import { useNavigate } from 'react-router-dom';

const HeatMapBox = ({ start, end }) => {
    const navigate = useNavigate();

    const handleChangeButtonClick = () => {
        navigate(`/TimeLine`);
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
                    <Selector selectedStart={start} selectedEnd={end} activeOption="Heatmap" />
                        <div className='boxHeatMap'>
                            <div className='refresh'>
                                <button type="button" className="refreshButton">
                                    Data Refreshed
                                    <img src={Refresh} alt="RefreshIcon" />
                                </button>
                            </div>
                            <div className='htmap'>
                                <Map2 Date1={start} Date2={end}/>
                            </div>
                            <FootPrint />
                            <BarEchart />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default HeatMapBox;

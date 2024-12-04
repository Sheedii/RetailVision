import React, { useState, useEffect } from 'react';
import Refresh from "../../assets/refresh.svg";
import Change from "../../assets/changeIcon.svg";
import Filters from '../../containers/filters/Filters';
import Selector from '../selector/Selector'
import { useNavigate } from 'react-router-dom';
import Map3 from "../map3/Map3";
import {Map2} from "../index";
import Map4 from "../map3/Map4";
import BarEchart from "../barEchart/BarEchart";
import BarEchartComp from "../barEchartCom/BarEchartComp";

const ComparatorBox = ({ start, end }) => {
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
                        <Selector selectedStart={start} selectedEnd={end} activeOption="Comparator" />
                        <div className='boxHeatMap'>
                            <div className='refresh'>
                                <button type="button" className="refreshButton">
                                    Data Refreshed
                                    <img src={Refresh} alt="RefreshIcon" />
                                </button>
                            </div>

                            <div className='htmap'>
                                <Map3 />
                                <div className="mapSpacer"></div>
                                <Map4 />

                            </div>
                            <BarEchartComp />




                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default ComparatorBox;

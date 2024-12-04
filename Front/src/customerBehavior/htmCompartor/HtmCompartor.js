import React, { useState } from 'react';
import './htmCompartor.css';
import { useNavigate } from 'react-router-dom';
import selectIcon from '../../assets/heatmap.svg';
import Agenda from '../heatmapTime/HeatmapTime';
import MapMini from '../heatmap/MapMini'; // Updated the import to MapMini
import ZoomIn from '../../assets/zoomOut.png';
import Stat from '../comparatorStat/ComparatorStat';
import GrandMap from '../heatmap/HeatMap'

const HtmCompartor = () => {
    const [selectedDate, setSelectedDate] = useState();
    const [selectedDate2, setSelectedDate2] = useState();
    const [selectedDate3, setSelectedDate3] = useState();
    const [selectedDate4, setSelectedDate4] = useState();

    const [applyClickedMap1, setApplyClickedMap1] = useState(false); // Separate applyClicked for Map 1
    const [applyClickedMap2, setApplyClickedMap2] = useState(false); // Separate applyClicked for Map 2

    const [zoomedMap1, setZoomedMap1] = useState(false);
    const [zoomedMap2, setZoomedMap2] = useState(false);
    const [statistics, setStatistics] = useState(false);
    const navigate = useNavigate();

    const handleApplyButtonClickMap1 = () => {
        setApplyClickedMap1(true);
        setStatistics(true);
    };

    const handleApplyButtonClickMap2 = () => {
        setApplyClickedMap2(true);
        setStatistics(true);
    };

    const handleNavigate = () => {
        navigate('/HeatMap');
    };

    const handleNavigateTopTen = () => {
        navigate('/Top10');
    };

    const handleZoomIn1Click = () => {
        setZoomedMap1(!zoomedMap1);
        setZoomedMap2(false);
    };
    const handleZoomIn2Click = () => {
        setZoomedMap1(false);
        setZoomedMap2(!zoomedMap2);
    };

    return (
        <div className='HeatmapCom'>
            <div className='HeatmapContainer'>
                <div className='ComparatorPageChangerButtons'>
                    <div className='ComparatorpageChanger'>Comparator</div>
                </div>
                <div className="SecondComparatorPageChangerButtons" onClick={handleNavigate}>Heatmap</div>
                <div className="GoToTopTenButtons" /*onClick={handleNavigateTopTen}*/>Common Path</div>
                <div className='ComponentHeader'>
                    <div className='comTitle'>
                        <img src={selectIcon} alt="selectIcon" />
                        Heatmap Comparator
                    </div>
                    <div className='selectTime'>
                        <div className='selectTimes'>
                            <div className='selectTime firstLineTime'>
                                <div className='titleTime'>Time Line 1 :</div>
                                From
                                <Agenda onDateChange={setSelectedDate} />
                                to
                                <Agenda onDateChange={setSelectedDate2} />
                                <button className='ComparatorApply' onClick={handleApplyButtonClickMap1}>Apply Map 1</button>
                            </div>
                            <div className='selectTime'>
                                <div className='titleTime'>Time Line 2 :</div>
                                From
                                <Agenda onDateChange={setSelectedDate3} />
                                to
                                <Agenda onDateChange={setSelectedDate4} />
                                <button className='ComparatorApply' onClick={handleApplyButtonClickMap2}>Apply Map 2</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='MapCompare'>
                    <div>
                        <div className='mapHeader'>
                            <div className='mapHeadertitle'>Map 1 :</div>
                            <div className='miniDate'> {selectedDate} - {selectedDate2}</div>
                            <img className='ZoomIn' src={ZoomIn} alt="ZoomIn" onClick={handleZoomIn1Click} />
                        </div>
                        <MapMini
                            mapId="map1"
                            Date1={selectedDate}
                            Date2={selectedDate2}
                            applyClicked={applyClickedMap1}
                            setApplyClicked={setApplyClickedMap1}
                        />
                    </div>
                    <div>
                        <div className='mapHeader'>
                            <div className='mapHeadertitle'>Map 2 :</div>
                            <div className='miniDate'> {selectedDate3} - {selectedDate4}</div>
                            <img className='ZoomIn' src={ZoomIn} alt="ZoomIn" onClick={handleZoomIn2Click} />
                        </div>
                        <MapMini
                            mapId="map2"
                            Date1={selectedDate3}
                            Date2={selectedDate4}
                            applyClicked={applyClickedMap2}
                            setApplyClicked={setApplyClickedMap2}
                        />
                    </div>
                </div>

                <div className="bigMap">
                    {(!zoomedMap1 && !zoomedMap2 && !statistics) && (
                        <div className="DefaultRectangle">
                            No Date Range Selected
                        </div>
                    )}

                    {zoomedMap1 && (
                        <GrandMap
                            mapId="Grand1"
                            Date1={selectedDate}
                            Date2={selectedDate2}
                            applyClicked={applyClickedMap1}
                            setApplyClicked={setApplyClickedMap1}
                        />
                    )}
                    {zoomedMap2 && (
                        <GrandMap
                            mapId="Grand2"
                            Date1={selectedDate3}
                            Date2={selectedDate4}
                            applyClicked={applyClickedMap2}
                            setApplyClicked={setApplyClickedMap2}
                        />
                    )}

                    {(statistics) &&
                        <Stat />
                    }
                </div>


            </div>
        </div>
    );
};

export default HtmCompartor;
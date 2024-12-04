import React from 'react';
import'./customerFlowBox.css'
import Refresh from "../../assets/refresh.svg";
import Change from "../../assets/changeIcon.svg";
import CustomerFlow from '../customerFlow/CustomerFlow';
import Filters from '../../containers/filters/Filters';
import Selector from '../selector/Selector'
import { useNavigate } from 'react-router-dom';

const CustomerFlowBox = ({ start, end }) => {
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
                    <Selector selectedStart={start} selectedEnd={end} activeOption="Customer flow" />
                        <div className='boxHeatMap'>
                            <div className='refresh'>
                                <button type="button" className="refreshButton">
                                    Data Refreshed
                                    <img src={Refresh} alt="RefreshIcon" />
                                </button>
                            </div>
                            <div className='CFB'>
                                <CustomerFlow/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}


export default CustomerFlowBox

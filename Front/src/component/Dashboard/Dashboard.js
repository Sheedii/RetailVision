import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import icon from '../../assets/VectorCustomer.svg'
import icon2 from '../../assets/visitors.svg'
import icon3 from '../../assets/fleshIcon.svg'
import icon4 from '../../assets/dateIcon.svg'
import icon5 from '../../assets/popularDep.svg'
import icon6 from '../../assets/visitorIcon.svg'
import Chart from '../chartRayon/ChartRayon'
import ChartRanking from '../chartRanking/ChartRanking'
import ItemList from '../itemList/ItemList';
import axios from 'axios';

const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return { day, month, year };
}

const Dashboard = () => {
    const navigate = useNavigate();

    const handleCustomerBehaviorClick = () => {
        navigate('/TimeLine'); 
    };
    const handleChartRankingClick = () => {
        navigate('/priceIndex'); 
    };
    const handleTrendyClick = () => {
        navigate('/Top10'); 
    };
    const { day, month, year } = getCurrentDate();



    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-main-card">
                <div className='firstRow'>
                    <div className='custumer_behavior_card' onClick={handleCustomerBehaviorClick}>
                        <div className='custumer_behavior_card_title'>Custumer behaviour <img className='customer_icon' src={icon} alt="customer_behavior_icon" /></div>
                    </div>
                    <div className='custumer_behavior_insights'>
                        <div className='twoCards'>
                            <div className='totalvisitors'>
                                <img className='visitor_icon' src={icon2} alt="visitor_icon" />
                                <div className="NumberOfVisitors">Total number of visitors</div>
                                <div className="_520">520</div>
                                <div className='yesterdayNumberComplete'>
                                    <img className='number_icon' src={icon3} alt="number_icon" />
                                    <div className='yesterdayNumberDesc'><div className="yesterdayNumber">50%</div>more visitors than yesterday</div>
                                </div>
                            </div>
                            <div className='dateCard'>
                                <img className='date_icon' src={icon4} alt="date_icon" />
                                <div className="monthOfTheDate">{month}</div>
                                <div className="yearOfTheDate">{day}, {year}</div>
                            </div>
                        </div>
                        <div className='popularDep'>
                            <img className='popularDep_icon' src={icon5} alt="popularDep_icon" />
                            <div className="popularDepartement"> The popular departement of the week </div>
                            <div className="theDepartement">fresh produce</div>
                        </div>
                    </div>
                </div>
                <div className='firstRow'>
                    <div className='zoneChart' onClick={handleCustomerBehaviorClick}>
                        <Chart />
                        <div className="visitZone">visitors per zone<img className='visitor_Icon' src={icon6} alt="visitor_Icon" /></div>
                    </div>
                    <div className='trendy' onClick={handleTrendyClick}>
                        <ItemList />
                        <div className="trendy_products">Trendy products D-1<img className='visitor_Icon' src={icon6} alt="visitor_Icon" /></div>
                    </div>
                </div>
                <div className='ranking' onClick={handleChartRankingClick}>
                    <div className="dashboardRanking">
                        <ChartRanking />
                    </div>
                    <div className="price_index">Price index<img className='visitor_Icon' src={icon6} alt="visitor_Icon" /></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

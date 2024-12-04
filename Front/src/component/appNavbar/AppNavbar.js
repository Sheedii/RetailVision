/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import './appNavbar.css';
import logo from '../../assets/logowise2.png';
import LogoutIcon from '../../assets/logouticon.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'


const AppNavbar = () => {

    const { user, logoutUser } = useContext(AuthContext)

    const navigate = useNavigate(); // Initialize useNavigate hook

    const [customerBehaviorActive, setCustomerBehaviorActive] = useState(false);
    const [dashboardActive, setDashboardActive] = useState(false);
    const [salesForecastingActive, setSalesForecastingActive] = useState(false);
    const [affinityTestingActive, setAffinityTestingActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleChange = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption === 'Correlation Matrix') {
            navigate(`/CorrelationMatrix`);
        }
        if (selectedOption === 'Product Comparator') {
            navigate(`/CorrelationMatrix`);
        }
        if (selectedOption === 'Top 10 Products') {
            navigate(`/CorrelationMatrix`);
        }
    };

    useEffect(() => {
        const path = window.location.pathname;

        setCustomerBehaviorActive(
            path === '/TimeLine' ||
            path.startsWith('/htm/') ||
            path.startsWith('/HeatMap') ||
            path.startsWith('/HeatMapComparator/') ||
            path.startsWith('/heatMapFlow/')
        );

        setDashboardActive(
            path === '/Dashboard' ||
            path === '/priceIndex'
        );

        setAffinityTestingActive(
            path === '/AffinityComparators' ||
            path === '/Comparator' ||
            path === '/DateComparator' ||
            path === '/DateComparatorTable' ||
            path === '/ComparatorTable' ||
            path === '/SearchMatrix' ||
            path === '/CorrelationMatrixSelect' ||
            path === '/CorrelationMatrix' ||
            path === '/Comprator2' ||
            path === '/Correlation2' ||
            path === '/Top10'
        );

        setSalesForecastingActive(path === '/forecast');

    }, []);



    return (
        <div className='appNavbar' >
            <div className="wise__appNavbar">
                <div className="links_logo2">
                    <a href="https://wisevision.io" target="_blank" rel="noopener noreferrer">
                        <img className='wiselogo2' src={logo} alt="wisevision_logo" />
                    </a>
                </div>

                <div className="links_container2">
                    <div className="dashboard">
                        <NavLink className={dashboardActive ? "activeDashboardLink" : "dashboardLink"} to="/Dashboard" onClick={() => setDashboardActive(true)}>
                            Dashboard
                        </NavLink>
                    </div>
                    <div className="customer_behavior">
                        <NavLink className={customerBehaviorActive ? "activeCustomer_behaviorLink" : "customer_behaviorLink"} to="/HeatMap" onClick={() => setCustomerBehaviorActive(true)}>
                            Customer Behavior
                        </NavLink>
                    </div>
                    <div className="customer_behavior">
                        <NavLink className={affinityTestingActive ? "activeCustomer_behaviorLink" : "customer_behaviorLink"} to="/Correlation2" onClick={() => setAffinityTestingActive(true)}>
                            Affinity Testing
                        </NavLink>
                    </div>
                    <div className="sales_forecasting">
                        <NavLink className="sales_forecasting" to="/forecast" onClick={() => setSalesForecastingActive(true)}>
                            Sales Forecasting
                        </NavLink>
                    </div>
                </div>


                <div className="sign2">
                    <p className="myAccount">My Account</p>
                    <div className='logoutbutt'>
                        <button className="applogout" type="button" onClick={logoutUser}>LOGOUT</button>
                        <img className='LogoutIcon' src={LogoutIcon} alt="LOGOUTIcon" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default AppNavbar
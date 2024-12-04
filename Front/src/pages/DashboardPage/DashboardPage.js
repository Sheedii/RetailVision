import React from 'react';
import './dashboardPage.css';
import { AppNavbar, AppHeader, Dashboard, Footer } from '../../component';

const DashboardPage = () => {
    return (
        <div>
            <AppNavbar />
            <AppHeader title="Dashboard" />
            <Dashboard />
            <Footer />
        </div>
    );
};

export default DashboardPage;

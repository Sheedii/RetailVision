import React from 'react'
import './timeLinePage.css'
import { AppNavbar, AppHeader, TimeLine, Footer } from '../../component';
const TimeLinePage = () => {
    return (
        <div>
            <AppNavbar />
            <AppHeader title="Customer Behavior" />
            <TimeLine />
            <Footer />
        </div>
    )
}

export default TimeLinePage

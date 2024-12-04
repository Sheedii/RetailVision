import React from 'react'
import { useParams } from 'react-router-dom';
import { AppNavbar, AppHeader, CustomerFlowBox, Footer } from '../../component';

const HeatMapFlow = () => {
    const { start, end } = useParams();

    return (
        <div>
            <AppNavbar />
            <AppHeader title="Customer Behavior" />
            <CustomerFlowBox start={start} end={end} />
            <Footer />
        </div>
    )
}

export default HeatMapFlow

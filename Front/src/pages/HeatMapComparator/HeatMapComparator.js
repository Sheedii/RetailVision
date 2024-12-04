import React from 'react'
import { useParams } from 'react-router-dom';
import { AppNavbar, AppHeader, HeatMapComparatorBox , Footer } from '../../component';
import {HtmCompartor} from '../../customerBehavior'
const HeatMapComparator = () => {
    const { start, end } = useParams();

    return (
        <div>
            <AppNavbar />
            <AppHeader title="Customer Behavior" />
            {/*<HeatMapComparatorBox start={start} end={end} />*/}
            <HtmCompartor/>
            <Footer/>
        </div>
    )
}

export default HeatMapComparator

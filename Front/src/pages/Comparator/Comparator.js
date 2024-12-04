import React from 'react'
import {AppNavbar, AppHeader, Footer} from '../../component';
import { useParams } from 'react-router-dom';
import ComparatorBox from "../../component/ComparatorBox/ComaparatorBox";

const Comparator = () => {
    const { start, end } = useParams();
    return (
        <div>
            <AppNavbar/>
            <AppHeader title="Customer Behavior" />
            <ComparatorBox start={start} end={end} />
            <Footer />
        </div>
    )
}

export default Comparator
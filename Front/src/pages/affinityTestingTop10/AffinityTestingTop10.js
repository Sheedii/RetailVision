import React from 'react'
import './affinityTestingTop10.css'
import { AppNavbar, AppHeader , Footer } from '../../component';
import {TopTen} from '../../affinity'

const AffinityTestingTop10 = () => {

    return (
        <div>
            <AppNavbar />
            <AppHeader title="Affinity Testing" />
            <TopTen />
            <Footer />
        </div>
    )
}

export default AffinityTestingTop10

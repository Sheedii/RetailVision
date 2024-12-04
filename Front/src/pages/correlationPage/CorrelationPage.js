import React from 'react'
import { AppNavbar, AppHeader, Footer } from '../../component';
import {CorrelationComponent} from '../../affinity'

const CorrelationPage = () => {
    return (
        <div>
            <AppNavbar />
            <AppHeader title="Affinity Testing" />
            <CorrelationComponent />
            <Footer />
        </div>
    )
}

export default CorrelationPage

import React from 'react'
import { AppNavbar, AppHeader, Footer } from '../../component';
import { SecondPriceIndex} from '../../pricing'

const SecondPriceIndexPage = () => {
    return (
        <div>
            <AppNavbar />
            <AppHeader title="Price index" />
            <SecondPriceIndex />
            <Footer />
        </div>
    )
}

export default SecondPriceIndexPage

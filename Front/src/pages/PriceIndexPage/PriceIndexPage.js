import React from 'react'
import './priceindexPage.css';
import { AppNavbar, AppHeader,  Footer } from '../../component';
import {PriceIndex} from '../../pricing'

const PriceIndexPage = () => {
  return (
    <div>
        <AppNavbar />
        <AppHeader title="Price index" />
        <PriceIndex />
        <Footer />
    </div>
  )
}

export default PriceIndexPage
import React from 'react'
import './forecastingPage.css'
import {AppNavbar , AppHeader, ForecastForm, Footer} from '../../component';

const ForecastingPage = () => {
  return (
    <div>
      <AppNavbar/>
      <AppHeader title="Sales Forecasting" />
      <ForecastForm/>
      <Footer/>
    </div>
  )
}

export default ForecastingPage

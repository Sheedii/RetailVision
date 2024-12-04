import React from 'react'
import forecastingimg from '../../assets/forecasting.jpg'
import Customer from '../../assets/customer.jpg'
import Affinity from '../../assets/affinity.jpg'
import { Service1 } from '../../component';

const ThreeServices = () => {
  return (
    <div>
            <Service1 className="first"
        backgroundImage={forecastingimg}
        title="Forecasting"
        solutionText="Wisevision Solutions allows retailers to predict in advance the demand for
        each good separately or from a category perspective, in order to optimize
        the supply chain that is behind."
      />
      <Service1
        backgroundImage={Customer}
        title="Customer Behaviour"
        solutionText="Our first product is a computer-vision-based solution that does the
        profiling and tracking for the customers, allowing our clients to monitor
        in real time the footprint inside the stores, and the ability to apply
        multiple filters for in-depth investigation related to specific segments."
      />
      <Service1
        backgroundImage={Affinity}
        title="Affinity testing"
        solutionText="We build machine learning algorithms to assess the likelihood of articles
        being bought in the same basket, this helps us identify the most suitable
        goods to be proposed in catalogues with respect to the seasonality and the
        catchment area factors"
      />
    </div>
  )
}

export default ThreeServices

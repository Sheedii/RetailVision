import React from 'react'
import './ourservices.css'
import { Navbar, OurServicesHeader, Carousel , WorkTitle, Ellipse } from '../../component';
import {Footer, ThreeServices } from '../../containers';


const OurServices = () => {
  return (
    <div className='servicePage'>
      
    <Navbar />

    <OurServicesHeader title="Our services"/>
    <div className="our-services-container">
      <Ellipse /> 
      <ThreeServices />
      <div className="spacer" style={{ margin: '150px 0' }}></div>
      <WorkTitle />
      <Carousel />
      <div className="spacer" style={{ margin: '150px 0' }}></div>
      <Footer />
    </div>
    
  </div>
  );
}

export default OurServices

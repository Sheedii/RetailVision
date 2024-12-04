import React from 'react'
import { Ellipse, Navbar, OurMission, Header, HomeSlider } from '../../component';
import { Footer } from '../../containers';
import './home.css';

const home = () => {
  return (
    <div className='homepage' >
      <Navbar />
      <Header />
      <Ellipse />
      <HomeSlider />
      <OurMission />
      <Footer />
    </div>
  )
}

export default home

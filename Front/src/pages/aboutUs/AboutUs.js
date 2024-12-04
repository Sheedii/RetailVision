import React from 'react'
import { Navbar, OurServicesHeader, Ellipse , WiseDef, Ready } from '../../component';
import { Footer } from '../../containers';
import './aboutUs.css'


const AboutUs = () => {
    return (
        <div>
            <Navbar />
            
            <OurServicesHeader title="About us" />
            <Ellipse />
            <WiseDef />
            <Ready />
            <Footer />
        </div>
    )
}

export default AboutUs

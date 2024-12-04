import React from 'react'
import './service1.css'


const Service1 = ({ backgroundImage, title, solutionText }) => {

    return (
        <div className="service1">
            <div className="firstservice">
                <div className='ServiceContent'>
                    <div className="forecasting">{title}</div>
                    <div className="wisevision_solution1">
                        {solutionText}
                    </div>
                </div>
                <div className="picture" style={{ background: `url(${backgroundImage})` }}>
                </div>
            </div>
        </div>
    );
}
export default Service1

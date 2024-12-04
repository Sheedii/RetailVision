import React from 'react'
import './services.css'
import Service1 from '../service1/Service1'
import forecastingimg from '../../assets/forecasting.jpg'

const Services = () => {
  return (
    <div className='wise_sevices'>
      <div className="Llumiere"></div>
      <div className="Rlumiere"></div>

      <svg
        className="back-ellipse"
        viewBox="0 0 1440 3514"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_599_98)">
          <mask id="path-1-inside-1_599_98" fill="white">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1440 246.636V3514H0V246.636C198.816 92.0541 448.658 0 720 0C991.342 0 1241.18 92.0541 1440 246.636Z"
            />
          </mask>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1440 246.636V3514H0V246.636C198.816 92.0541 448.658 0 720 0C991.342 0 1241.18 92.0541 1440 246.636Z"
            fill="#090909"
            fill-opacity="1"
          />
          <path
            d="M1440 3514H-7V3521H0V3514ZM0 243.212V246.636H0ZM1433 246.636V3514H1447V246.636H1433ZM1440 3ZM7 3514V246.636H-7V3514H7ZM4.29668 252.162C201.927 98.5017 450.268 7 720 7V-7C447.047 -7 195.704 85.6065 -4.29668  252.162ZM720 7C989.732 7 1238.07 98.5017 1435.7 252.162L1444.3 241.11C1244.3 85.6065 992.953 -7 720 -7V7Z"
            fill="url(#paint0_linear_599_98)"
            mask="url(#path-1-inside-1_599_98)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_599_98"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0702452" stop-color="#08074E" />
            <stop offset="1" stop-color="#008080" />
          </linearGradient>
        </defs>
      </svg>


    </div>
  )
}

export default Services

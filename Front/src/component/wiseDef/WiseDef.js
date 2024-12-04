import React from 'react'
import './wiseDef.css'
import market from '../../assets/market.png'

const WiseDef = () => {
    return (
        <div className='WiseDescriptionPage'>
                        <svg
        className="frame3"
        width="70"
        height="50"
        viewBox="0 0 70 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 17.5H20.0365C22.3582 10.7762 24.3407 7.55625 30.9375 4.80725C32.0385 4.34825 32.6613 3.1765 32.4268 2.007C32.1925 0.83975 31.167 0 29.9755 0H29.9705C16.2083 0.0245 8.303 5.542 2.6975 19.0283C0.90825 23.2643 0 27.7978 0 32.5C0 39.7315 2.1875 43.6695 5.5225 48.8525C5.9815 49.5678 6.775 50 7.6245 50H25C29.1357 50 32.5 46.6357 32.5 42.5V25C32.5 20.8643 29.1357 17.5 25 17.5ZM62.5 17.5H57.5365C59.8583 10.7762 61.8408 7.55625 68.4375 4.80725C69.5385 4.34825 70.1612 3.1765 69.9268 2.007C69.6925 0.83975 68.667 0 67.4755 0H67.4705C53.7082 0.0245 45.803 5.542 40.1975 19.0283C38.4082 23.2643 37.5 27.7978 37.5 32.5C37.5 39.7315 39.6875 43.6695 43.0225 48.8525C43.4815 49.5678 44.275 50 45.1245 50H62.5C66.6357 50 70 46.6357 70 42.5V25C70 20.8643 66.6357 17.5 62.5 17.5Z"
          fill="white"
        />
      </svg>

            <div className='description0'>
                WiseVision Technologies is a company specialized in building AI solutions
                mainly for the retail sector, we use computer vision and machine learning to
                analyse the customer behaviour inside our stores then merge this data to the
                sales history in order to evaluate the pertinence of the proposed assortment.
            </div>

            <img className="wisellipse" src={market} alt="wisellipse" />

        </div>
    )
}

export default WiseDef

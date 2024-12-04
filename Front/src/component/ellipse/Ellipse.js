import React from 'react'
import './ellipse.css'


const Ellipse = () => {
  return (
    <div className='wise_sevices'>
      <div className="Ll"></div>
      <div className="Rl"></div>

      <svg
        class="ellip"
        width="1440"
        height="260"
        viewBox="0 0 1440 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        
        <g filter="url(#filter0_b_810_1874)">
          <mask id="path-1-inside-1_810_1874" fill="white">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1440 251H0V246.635C198.815 92.0538 448.657 0 719.999 0C991.342 0 1241.18 92.0544 1440 246.637Z"
            />
          </mask>

          <path
            d="M1440 246.637H1447V243.213L1444.3 241.111L1440 246.637ZM1440 260V267H1447V260H1440ZM0 260H-7V267H0V260ZM0 246.635L-4.29667 241.109L-7 243.211V246.635H0ZM1433 246.637V260H1447V246.637H1433ZM1440 253H0V267H1440V253ZM7 260V246.635H-7V260H7ZM4.29667 252.162C201.927 98.5014 450.268 7 719.999 7V-7C447.047 -7 195.704 85.6062 -4.29667 241.109L4.29667 252.162ZM719.999 7C989.731 7 1238.07 98.502 1435.7 252.163L1444.3 241.111C1244.3 85.6068 992.952 -7 719.999 -7V7Z"
            fill="url(#paint0_linear_810_1874)"
            mask="url(#path-1-inside-1_810_1874)"
          />
        </g>
        
        <defs>
          <linearGradient
            id="paint0_linear_810_1874"
            x1="184"
            y1="25"
            x2="1209"
            y2="90"
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

export default Ellipse

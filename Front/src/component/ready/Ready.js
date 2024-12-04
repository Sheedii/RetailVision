import React from 'react'
import './ready.css'

const Ready = () => {

    return (
        <div className='readyComponent'>
            <div className="rectangle24">
                <div class="ourhelp">Our team is ready to help</div>
                <div>
                    <button className="butt">
                        <div class="buttContent">Contact Us
                            <svg
                                className="arrow1"
                                width="17"
                                height="12"
                                viewBox="0 0 17 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.6531 6.39301C16.9489 6.09721 16.9489 5.61763 16.6531 5.32183L11.8328 0.501521C11.537 0.205723 11.0574 0.205723 10.7616 0.501521C10.4658 0.797319 10.4658 1.2769 10.7616 1.5727L15.0463 5.85742L10.7616 10.1421C10.4658 10.4379 10.4658 10.9175 10.7616 11.2133C11.0574 11.5091 11.537 11.5091 11.8328 11.2133L16.6531 6.39301ZM0.96875 6.61486H16.1175V5.09998H0.96875V6.61486Z"
                                    fill="white"
                                />
                            </svg>  </div>
                    </button>

                </div>
            </div>
            <div className='container1'>
            <div class="mission">Our mission</div>
            <div className="missionParagraphe">
                Build the best product that creates the most value for our customers, use
                business to inspire and implement environmentally friendly solutions.
            </div>
            </div>
        </div>
    )
}

export default Ready

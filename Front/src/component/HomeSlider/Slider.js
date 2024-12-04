import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import "./Slider.css";
import market from "../../assets/market.png";
import forecasting from "../../assets/forecasting.png";
import customer from "../../assets/customer.jpg";

function Slider() {
    useEffect(() => {
        const initializeCarousel = () => {
            const carousel = document.querySelector('.custom-carousel');
            if (carousel) {
                M.Carousel.init(carousel, { padding: 200 });
            }
        };

        initializeCarousel();
    }, []);

    return (
        <div className='ourservicesSlider'>
            <div className="our-servicess">Our services
                <div className="line3"></div>
            </div>
            
            <div className="custom-carousel carousel">
                <div className="carousel-item">
                    <div className="testi">
                        <div className="img-ss">
                            <img className="Slider-img" src={forecasting} alt="Customer Behavior" />
                        </div>
                        <h4>Customer Behavior</h4>
                        <div className='paragraphe2'>
                            Our first product is a computer-vision-based solution that does the profiling
                            and tracking for the customers, allowing our clients to monitor in real time
                            the footprint inside the stores, and the ability to apply multiple filters for
                            in depth investigation related to specific segments.
                        </div>
                        <div className='readme'>
                            <button className="butt">
                                <div class="buttContent">Read more
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
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">

                    <div className="testi">
                        <div className="img-ss">
                            <img className="Slider-img" src={forecasting} alt="Forecasting" />
                        </div>
                        <h4>Forecasting</h4>
                        <div className='paragraphe2'>

                            Wisevision Solutions allows retailers to predict in advance the demand for
                            each good separately or from a category perspective, in order to optimize the
                            supply chain that is behind.
                        </div>
                        <div className='readme'>
                            <button className="butt">
                                <div class="buttContent">Read more
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

                </div>
                <div className="carousel-item">

                    <div className="testi">
                        <div className="img-ss">
                            <img className="Slider-img" src={customer} alt="Affinity Testing" />
                        </div>
                        <h4>Affinity Testing</h4>
                        <div className='paragraphe2'>
                            We build machine learning algorithms to assess the likelihood of articles
                            being bought in the same basket, this helps us identify the most suitable
                            goods to be proposed in catalogues with respect to the seasonality and the
                            catchment area factors.
                        </div>

                        <div className='readme'>
                            <button className="butt">
                                <div class="buttContent">Read more
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

                </div>
            </div>
        </div>
    );
}

export default Slider;

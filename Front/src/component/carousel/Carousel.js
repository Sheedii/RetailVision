import React, { useEffect } from 'react';
import './carousel.css'
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import 'materialize-css/dist/css/materialize.min.css'; // Import the CSS file
import M from 'materialize-css'; // Import the JavaScript library
import right from '../../assets/rightflech.png'
import left from '../../assets/leftflech.png'

const Carousel = () => {
    useEffect(() => {
        const initializeCarousel = () => {
            const carousel = document.querySelector('.carousel');
            if (carousel) {
                M.Carousel.init(carousel, {
                    padding: 200, noWrap: true, indicators: false, // Disable indicators
                    onCycleTo: () => false, // Disable auto-cycling
                    touch: false
                });
            }
        };
        initializeCarousel();
    }, []);

    const moveToLeft = () => {
        const carouselInstance = M.Carousel.getInstance(document.querySelector('.carousel'));
        carouselInstance.prev();
    };

    const moveToRight = () => {
        const carouselInstance = M.Carousel.getInstance(document.querySelector('.carousel'));
        carouselInstance.next();
    };

    return (
        <div className='wise_carousel'>
            <div className='ok'>
                <div className="carousel" style={{ paddingBottom: '550px' }}>
                    <p className="carousel-item" style={{
                        background: '#008080',
                        borderRadius: '13.91px',
                        width: '393.76px',
                        height: '467.5px',
                        boxShadow: '0px 0px 30px 0px rgba(0, 128, 128, 0.7)'
                    }}>
                        <div style={{ color: '#ffffff', textAlign: 'left', fontFamily: 'Karla-Regular, sans-serif', fontSize: '120px', fontWeight: 400 }}>1</div>
                        <div className='insights'>Advanced Customer Insights</div>
                    </p>
                    <p className="carousel-item" style={{
                        width: '393.76px',
                        height: '467.5px',
                        background: '#246eb9',
                        borderRadius: '13.91px',
                        borderStyle: 'solid',
                        borderColor: '#246eb9',
                        borderWidth: '2px',
                        boxShadow: '0px 0px 30px 0px rgba(36, 110, 185, 0.7)'

                    }}>
                        <div style={{ color: '#ffffff', textAlign: 'left', fontFamily: 'Karla-Regular, sans-serif', fontSize: '120px', fontWeight: 400 }}>2</div>
                        <div className='insights'>Actionable Data Visualization</div></p>
                    <p className="carousel-item" style={{
                        background: '#07194e',
                        borderRadius: '13.91px',
                        height: '467.5px',
                        width: '393.76px',
                        boxShadow: '0px 0px 30px 0px rgba(8, 7, 78, 0.7)'
                    }}>
                        <div style={{ color: '#ffffff', textAlign: 'left', fontFamily: 'Karla-Regular, sans-serif', fontSize: '120px', fontWeight: 400 }}>3</div>
                        <div className='insights'>User-Friendly Interface</div></p>
                </div></div>
            <div className='flech'>
                <button className='Lbtn' onClick={moveToLeft}>
                    <img className='left' src={left}></img>
                </button>
                <button className='Rbtn' onClick={moveToRight}>
                    <img className='right' src={right}></img>
                </button>
            </div>

            <div class="group05">
                <div class="rectangle200">
                    <div className='insights2'>Advanced Customer Insights</div>
                    <div class="_21">1</div>
                </div>
                <div class="rectangle21">
                    <div className='insights2'>Actionable Data Visualization</div>
                    <div class="_22">2</div>
                </div>
                <div class="rectangle220">
                    <div className='insights2'>User-Friendly Interface</div>
                <div class="_23">3</div>
            </div>
        </div>

        </div >
    )
}

export default Carousel

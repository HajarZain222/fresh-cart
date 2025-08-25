import React from 'react'
import Style from './MainSlider.module.css'
import slid1 from '../../assets/slider-image-1.jpeg'
import slid2 from '../../assets/slider-image-2.jpeg'
import slid3 from '../../assets/slider-image-3.jpeg'
import grocery1 from '../../assets/grocery-banner.png'
import grocery2 from '../../assets/grocery-banner-2.jpeg'
import Slider from 'react-slick'

function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 1000,
    };

    return (
        <>
        <div className='grid grid-cols-[2fr_1fr]'>
            <div className='overflow-hidden'>
                <Slider {...settings} className='mb-10 w-full'>
                    <img src={slid3} alt="main-slider" className='w-[100%] h-[250px] object-cover' />
                    <img src={slid2} alt="main-slider" className='w-[100%] h-[250px] object-cover'/>
                    <img src={slid1} alt="main-slider" className='w-[100%] h-[250px] object-cover'/>
                </Slider>
            </div>
            <div>
                <img src={grocery1} alt="main-slider" className='w-full h-[125px] object-cover'/>
                <img src={grocery2} alt="main-slider" className='w-full h-[125px] object-cover'/>
            </div>
        </div>
        
        </>
    )
}

export default MainSlider
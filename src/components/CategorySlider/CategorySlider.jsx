import React, { useEffect, useState } from 'react'
import Style from './CategorySlider.module.css'
import { baseUrl } from '../../utils/baseUrl'
import Slider from 'react-slick';
import axios from 'axios';
function CategorySlider() {
    const [categories, setCategories] = useState([])
    function getCategories() {
        axios.get(`${baseUrl}/categories`)
        .then((res) => {
            console.log(res.data.data);
            setCategories(res.data.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
            },
            {
            breakpoint: 768, 
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 480, 
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    };


    return (
        <>
        <Slider {...settings} className='mb-10'>
        {categories.map((category) => {
            return (
                <div key={category?._id}>
                    <img 
                        src={category.image} 
                        className="w-full h-[150px] object-contain mx-auto" 
                        alt={category.name} 
                    />
                    <h3 className="text-center mt-2 text-sm sm:text-base truncate">{category.name}</h3>
                </div>
            )
        })}
        </Slider>
        </>
    )
}

export default CategorySlider
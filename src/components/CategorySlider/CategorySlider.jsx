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
        autoplaySpeed: 1000,
    };

    return (
        <>
        <Slider {...settings} className='mb-10'>
        {categories.map((category) => {
            return (
                <div key={category?._id}>
                    <img src={category.image} className='w-full h-[200px] object-cover' alt={category.name} />
                    <h3 className='text-center mt-2'>{category.name}</h3>
                </div>
            )
        })}
        </Slider>
        </>
    )
}

export default CategorySlider
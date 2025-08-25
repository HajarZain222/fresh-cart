import React from 'react'
import Style from './Home.module.css'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

function Home() {
    return (
        <>
        <MainSlider />
        <CategorySlider />
        <Products />
        </>
    )
}

export default Home


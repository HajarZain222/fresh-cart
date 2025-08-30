import React from 'react'
import Style from './Home.module.css'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'

function Home() {
    return (
        <>
        <Helmet>
            <title>Fresh Cart</title>
        </Helmet>
        <MainSlider />
        <CategorySlider />
        <Products />
        </>
    )
}

export default Home


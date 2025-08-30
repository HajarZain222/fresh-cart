import React from 'react'
import Style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

function Layout() {
    return (
        <div className="flex flex-col min-h-screen dark:bg-gray-800">
            <Navbar />

            <main className="dark:bg-gray-800 text-gray-700 dark:text-gray-400 flex-grow container mx-auto pt-15 pb-5 min-h-[calc(100vh-80px)]">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default Layout
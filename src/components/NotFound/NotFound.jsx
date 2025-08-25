import React from 'react'
import { Link } from 'react-router-dom'   
import { ArrowRight } from 'lucide-react' 
import error from '../../assets/error.svg'

function NotFound() {
    return (
        <>
        <div className="flex flex-col items-center justify-center mt-10 relative">
            <h2 className="title pb-10">Oops! This page was not found</h2>
            <img
            src={error}
            alt="error"
            className="w-[500px] h-auto object-contain"
            />

            <div className="w-full flex justify-end mt-6 pr-6">
            <Link
                to="/"
                className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition"
            >
                Home <ArrowRight size={20} />
            </Link>
            </div>
        </div>
        </>
    )
}

export default NotFound

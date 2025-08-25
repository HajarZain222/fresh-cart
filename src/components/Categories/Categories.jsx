import React from 'react'
import Style from './Categories.module.css'
import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
function Categories() {

    function getBrands() {
        return axios.get(`${baseUrl}/categories`)
    }

    const {data, isError, isLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: getBrands,
        staleTime: 5000,
        retry: 3,
        retryDelay: 3000,
        select: (data) => data.data.data
    })
    console.log(data);
    const categories = data || []

    if(isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#0AAD0A" size={70} />
            </div>
        )
    }

    if(isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1>Something went wrong</h1>
            </div>
        )
    }

    return (
        <>
        {categories?.length > 0 && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 pt-5">
                {categories.map((category) => {
                return (
                    <Link to={`/category/${category._id}`} key={category._id}>
                        <div
                            key={category._id}
                            className="group relative text-start shadow-md rounded-xl p-4 overflow-hidden bg-white dark:bg-gray-700"
                        >
                            <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-60 object-cover rounded-md"
                            />

                            <h2 className="font-semibold text-lg truncate text-center text-gray-400">
                            {category.name}
                            </h2>

                        </div>
                    </Link>
                );
            })}
            </div>
        )}
        </>
    )
}

export default Categories




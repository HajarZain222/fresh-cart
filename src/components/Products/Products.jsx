import React, { useContext } from 'react'
import Style from './Products.module.css'
import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishlistContext'
import { Helmet } from 'react-helmet'

function Products() {

    let {addToCart} = useContext(CartContext)
    let { addToWishlist, deleteFromWishlist, wishlistProductsId } = useContext(WishlistContext);

    async function addProductToCart(id) {
        let flag = await addToCart(id)
        console.log(flag);
        if(flag) {
            toast.success('Product added to cart successfully')
        } else {
            toast.error('Oops something went wrong')
        }
    }

    async function toggleWishlist(productId) {
        if (wishlistProductsId.includes(productId)) {
            await deleteFromWishlist(productId);
        } else {
            await addToWishlist(productId);
        }
    }
    function callProducts() {
        return axios.get(`${baseUrl}/products`)
    }

    const {data, isError, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: callProducts,
        staleTime: 5000,
        // refetchInterval: 5000,
        retry: 3,
        retryDelay: 3000,
        // refetchIntervalInBackground: true,
        // refetchOnWindowFocus: true,
        // gcTime: 5000,
        select: (data) => data.data.data
    })
    // console.log(data);
    const products = data || []

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
        <Helmet>
            <title>Products</title>
        </Helmet>
        
        {products.length > 0 && (
            <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 pt-5">
                {products.map((product) => {
                    const isInWishlist = wishlistProductsId.includes(product.id);
                    return (
                        <div
                            key={product.id}
                            className="group relative text-start shadow-md rounded-xl p-4 overflow-hidden bg-white dark:bg-gray-700"
                        >
                            <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                            {/* Image */}
                            <div className="relative">
                                <img
                                src={product.imageCover}
                                alt={product.title}
                                className="w-full h-60 object-cover rounded-md"
                                />

                                {/* Sale Badge */}
                                {product.priceAfterDiscount && (
                                <span className="absolute top-0 left-0 rounded-br-md bg-red-600 text-white px-2 py-1 text-sm">
                                    Sale
                                </span>
                                )}

                                {/* Wishlist Icon */}
                                <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition rounded-full p-2 shadow-md"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleWishlist(product.id);
                                }}
                                >
                                <i className={`fa-solid fa-heart cursor-pointer ${
                                    isInWishlist ? "text-red-500" : "text-gray-600 hover:text-red-500"
                                }`}></i>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="mt-3">
                                <h3 className="text-green-700 text-sm">{product.category.name}</h3>
                                <h2 className="font-semibold text-lg truncate">
                                {product.title.split(" ").slice(0, 2).join(" ")}
                                </h2>

                                <div className="flex justify-between items-center mt-2">
                                {product.priceAfterDiscount ? (
                                    <div className="text-sm">
                                    <span className="font-bold">
                                        {product.priceAfterDiscount} EGY
                                    </span>
                                    <span className="line-through text-red-500 ml-2">
                                        {product.price} EGY
                                    </span>
                                    </div>
                                ) : (
                                    <span className="font-bold">{product.price} EGY</span>
                                )}

                                <span className="flex items-center text-sm">
                                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                                    {product.ratingsAverage}
                                </span>
                                </div>
                            </div>
                            </Link>

                            {/* Add to Cart */}
                            <button
                            onClick={() => addProductToCart(product.id)}
                            className="group-hover:translate-y-0 btn-green translate-y-[300%] mt-3 w-full"
                            >
                            Add to cart
                            </button>
                        </div>
                    );
                }
                )}
            </div>
        )}
        </>
    )
}

export default Products
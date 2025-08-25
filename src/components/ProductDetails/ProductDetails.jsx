import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { WishlistContext } from '../../Context/WishlistContext'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'
function ProductDetails() {
    const {id, category} = useParams()
    const [productDetails, setProductDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [relatedProducts, setRelatedProducts] = useState([])

    let {addToCart} = useContext(CartContext)
    let { addToWishlist, deleteFromWishlist, wishlistProductsId } = useContext(WishlistContext);


    function getSpecificProduct(id) {
        setIsLoading(true)
        axios.get(`${baseUrl}/products/${id}`)
        .then((res) => {
            console.log(res.data.data)
            setProductDetails(res.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    function getRelatedProducts(category) {
        setIsLoading(true)
        axios.get(`${baseUrl}/products`)
        .then((res) => {
            // console.log(res.data.data)
            setRelatedProducts(res.data.data.filter((product) => product.category.name === category))
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getSpecificProduct(id)
        getRelatedProducts(category)
    }, [id, category])

    async function toggleWishlist(productId) {
    if (wishlistProductsId.includes(productId)) {
        await deleteFromWishlist(productId);
        } else {
        await addToWishlist(productId);
        }
    }

    async function addProductToCart(id) {
        let flag = await addToCart(id)
        console.log(flag);
        if(flag) {
            toast.success('Product added to cart successfully')
        } else {
            toast.error('Oops something went wrong')
        }
    }

    const isInWishlist = productDetails && wishlistProductsId.includes(productDetails.id);

    return (
    <>
        {isLoading ? (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#0AAD0A" size={70} />
            </div>
        ) : productDetails ? (
            <>
                <div className="grid md:grid-cols-2 gap-10 items-start bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 pt-10">
                    <div className="flex justify-center relative">
                        <img
                            src={productDetails.imageCover}
                            alt={productDetails.title}
                            className="w-full max-w-md rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                        />

                        {/* Sale Badge */}
                        {productDetails.priceAfterDiscount && (
                            <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md">
                            Sale
                            </span>
                        )}

                        {/* Wishlist Icon */}
                        <button
                            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:scale-110 transition cursor-pointer"
                            onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(productDetails.id);
                            }}
                        >
                            <i
                            className={`fa-solid fa-heart text-lg ${
                                isInWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
                            }`}
                            ></i>
                        </button>
                    </div>

                    <div className="text-start space-y-5">
                        <h2 className="text-2xl font-bold text-gray-800">{productDetails.title}</h2>

                        <p className="text-gray-600 leading-relaxed">{productDetails.description}</p>

                        <h3 className="text-green-600 font-medium">
                        {productDetails.category.name}
                        </h3>

                        <div className="flex items-center justify-between border-t border-b py-3">
                        {productDetails.priceAfterDiscount ? (
                            <div className="text-lg font-semibold ml-2 text-gray-800">
                            
                            <span>{productDetails.priceAfterDiscount} EGY</span>
                            <span className="line-through text-red-500 ml-2 text-sm">
                                {productDetails.price} EGY
                            </span>
                            </div>
                        ) : (
                            <span className="text-lg font-semibold text-gray-800">
                            {productDetails.price} EGY
                            </span>
                        )}

                        <span className="flex items-center text-yellow-500 font-medium">
                            <i className="fas fa-star mr-1"></i>
                            {productDetails.ratingsAverage}
                        </span>
                        </div>

                        <button className="btn-green mx-auto block">
                        Add to Cart
                        </button>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 pt-5">
                        {relatedProducts.map((product) => {
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
        ) : (
            <p className="text-center">No product found</p>
        )}
    </>
    )
}

export default ProductDetails

import React, { useContext, useEffect, useState } from 'react'
import Style from './WishList.module.css'
import emptyWishlist from '../../assets/emptyWishlist.svg'
import { WishlistContext } from '../../Context/WishlistContext';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
function WishList() {
    let { getWishlist, deleteFromWishlist } = useContext(WishlistContext);
    let {addToCart} = useContext(CartContext)

    const [wishlistData, setWishlistData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getWishlist().then((res) => {
        if (res) setWishlistData(res.data);
        setLoading(false);
        });
    }, []);

    async function addProductToCart(id) {
        let flag = await addToCart(id)
        console.log(flag);
        if(flag) {
            toast.success('Product added to cart successfully')
        } else {
            toast.error('Oops something went wrong')
        }
    }

    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#0AAD0A" size={70} />
        </div>
        );
    }

    return (
        <>
        {wishlistData.length > 0 ? (
            <>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 pt-5">
                {wishlistData.map((product) => (
                    <div
                    key={product.id}
                    className="group relative text-start shadow-md rounded-xl p-4 overflow-hidden bg-white dark:bg-gray-700"
                    >
                    <Link to={`/productDetails/${product.id}/${product.category.name}`}>
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

                            <button
                                className="absolute top-2 right-2 transition rounded-full p-2 shadow-md"
                                onClick={(e) => {
                                e.preventDefault();
                                deleteFromWishlist(product.id).then(() => {
                                    setWishlistData((prev) => prev.filter((p) => p.id !== product.id));
                                });
                                }}
                            >
                                <i className="fa-solid fa-heart text-red-500 cursor-pointer"></i>
                            </button>
                        </div>

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

                    <button
                        onClick={() => addProductToCart(product.id)}
                        className="group-hover:translate-y-0 btn-green translate-y-[300%] mt-3 w-full"
                        >
                        Add to cart
                        </button>
                    </div>
                ))}
            </div>
            </>
        ) : (
            <div className="flex flex-col items-center justify-center mt-10">
                <h2 className="title pb-10">Your wishlist is empty</h2>
                <img src={emptyWishlist} alt="Wishlist cart" className="w-[500px] h-auto object-contain" />
            </div>
        )}
        </>
    )
}

export default WishList
import React, { useContext, useEffect } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import emptyCart from '../../assets/emptyCart.svg'
import { Helmet } from 'react-helmet'
function Cart() {
    let {getCart, updateCartQuantity, removeFromCart, clearAllCart, totalPrice, productsCart} = useContext(CartContext)

    async function updateCart(id, count) {
        let flag = await updateCartQuantity(id, count)  
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <>
        <Helmet>
            <title>Cart</title>
        </Helmet>

        {productsCart?.length > 0 ? (
        <>
            <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                        <th scope="col" className="px-6 py-3">Product</th>
                        <th scope="col" className="px-6 py-3">Quantity</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productsCart?.map((product) => (
                        <tr key={product.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                            <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                            <button onClick={() => updateCart(product.product._id, product.count - 1)} className="h-6 w-6 flex items-center justify-center border rounded-full">-</button>
                            <input type="number" value={product.count} readOnly className="w-14 mx-2 text-center border rounded-lg" />
                            <button onClick={() => updateCart(product.product._id, product.count + 1)} className="h-6 w-6 flex items-center justify-center border rounded-full">+</button>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-semibold">{product.price}</td>
                        <td className="px-6 py-4">
                            <span onClick={() => removeFromCart(product.product._id)} className="text-red-600 cursor-pointer">Remove</span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr className="bg-gray-50 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white">
                        <td colSpan="4" className="px-2 py-4 text-right">
                        <h2 className="text-lg">Total Price :</h2>
                        </td>
                        <td className="py-4 text-left">
                        <p className="text-green-700 font-bold text-xl">{totalPrice} EGP</p>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            <div className="flex justify-between my-10">
            <Link to="/payment" className="btn-green">Payment</Link>
            <button onClick={() => clearAllCart()} className="btn-red">Clear Cart</button>
            </div>
        </>
        ) : (
        <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="title pb-10">Your cart is empty</h2>
            <img src={emptyCart} alt="Empty cart" className="w-[500px] h-auto object-contain" />
        </div>
        )}
        </>
)

}

export default Cart
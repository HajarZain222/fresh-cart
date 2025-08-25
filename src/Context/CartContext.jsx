import { baseUrl } from '../utils/baseUrl'
import axios from 'axios'
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast'

export let CartContext = createContext()
function CartContextProvider({ children }) {

    const [numOfCart, setNumOfCart] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [productsCart, setProductsCart] = useState(null)

    const [cartId, setCartId] = useState(null)

    let token = localStorage.getItem('token')

    async function addToCart(productId) {
        return axios.post(`${baseUrl}/cart`, {
            productId: productId
        }, {
            headers: {
                token: token
            }
        }).then((res) => {
            console.log(res);
            setNumOfCart(res.data.numOfCartItems);
            setTotalPrice(res.data.data.totalCartPrice);
            setProductsCart(res.data.data.products);
            return true

        }).catch((error) => {
            console.log(error);
            return false
        })
    }

    function getCart() {
        return axios.get(`${baseUrl}/cart`, {
            headers: {
                token: token
            }
        })
        .then((res) => {
            console.log(res.data);
            setCartId(res.data.cartId);

            setNumOfCart(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            setProductsCart(res.data.data.products)
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    async function updateCartQuantity(id, count) {
        return axios.put(`${baseUrl}/cart/${id}`, {
            count: count
        }, {
            headers: {
                token: token
            }
        })
        .then((res) => {
            console.log(res.data);
            setNumOfCart(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            setProductsCart(res.data.data.products)
            return true
        })
        .catch((error) => {
            console.log(error);
            return false
        })
    }

    function removeFromCart(id) {
        return axios.delete(`${baseUrl}/cart/${id}`, {
            headers: {
                token: token
            }
        })
        .then((res) => {
            console.log(res.data);
            setNumOfCart(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            setProductsCart(res.data.data.products)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function clearAllCart() {
        return axios.delete(`${baseUrl}/cart`, {
            headers: {
                token: token
            }
        })
        .then((res) => {
            console.log(res.data);
            setNumOfCart(0)
            setTotalPrice(0)
            setProductsCart([])
            toast.success('Your Cart is empty now')
        })
        .catch((error) => {
            console.log(error);
            toast.error('Oops something went wrong')
        })
    }

    return (
        <>
        <CartContext.Provider value={{addToCart, getCart, updateCartQuantity, removeFromCart, clearAllCart, cartId, numOfCart, totalPrice, productsCart}}>
            {children}
        </CartContext.Provider>
        </>
    )
}

export default CartContextProvider

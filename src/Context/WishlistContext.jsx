import { baseUrl } from '../utils/baseUrl'
import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

function WishlistContextProvider({ children }) {
    const [wishlistCounter, setWishlistCounter] = useState(0);
    const [wishlistProductsId, setWishlistProductsId] = useState([]);

    const token = localStorage.getItem("token");

    // Add to Wishlist
    async function addToWishlist(productId) {
        return axios
        .post(
            `${baseUrl}/wishlist`,
            { productId },
            { headers: { token } }
        )
        .then((res) => {
            setWishlistCounter(res.data.data.length);
            setWishlistProductsId(res.data.data.map((p) => p._id));
            toast.success("Added to wishlist ❤️");
            return true;
        })
        .catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
            return false;
        });
    }

    // Remove from Wishlist
    async function deleteFromWishlist(productId) {
        return axios
        .delete(`${baseUrl}/wishlist/${productId}`, {
            headers: { token },
        })
        .then((res) => {
            setWishlistCounter(res.data.data.length);
            setWishlistProductsId(res.data.data.map((p) => p._id));
            toast.success("Removed from wishlist 🗑️");
            return true;
        })
        .catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
            return false;
        });
    }

    // Get Wishlist
    async function getWishlist() {
        return axios
        .get(`${baseUrl}/wishlist`, {
            headers: { token },
        })
        .then((res) => {
            setWishlistCounter(res.data.count);
            setWishlistProductsId(res.data.data.map((p) => p._id));
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
    }

    return (
        <WishlistContext.Provider
        value={{
            wishlistCounter,
            wishlistProductsId,
            addToWishlist,
            deleteFromWishlist,
            getWishlist,
        }}
        >
        {children}
        </WishlistContext.Provider>
    );
}

export default WishlistContextProvider;

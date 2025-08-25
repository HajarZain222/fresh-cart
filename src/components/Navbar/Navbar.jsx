import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import light_logo from "../../assets/fresh-cart-light-logo.svg";
import dark_logo from "../../assets/fresh-cart-dark-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

function Navbar() {
    const { token, setToken } = useContext(UserContext);
    const { numOfCart } = useContext(CartContext);
    const { wishlistCounter } = useContext(WishlistContext);

    const [navToggle, setNavToggle] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

return (
    <nav className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 fixed top-0 start-0 end-0 border-b border-zinc-200 z-50">
        <div className="container mx-auto flex items-center justify-between p-4">

        {/* Logo + Toggle (Mobile) */}
        <div className="flex items-center justify-between w-full md:w-auto">
            <NavLink to="/" className="flex items-center">
            <img src={light_logo} alt="fresh-cart-logo" className="w-36 h-auto dark:hidden" />
            <img src={dark_logo} alt="fresh-cart-logo" className="w-36 h-auto hidden dark:block" />
            </NavLink>

            <button
            onClick={() => setNavToggle(!navToggle)}
            className="md:hidden text-2xl text-zinc-900 dark:text-zinc-100"
            >
            <i className={`fa-solid ${navToggle ? "fa-xmark" : "fa-bars"} cursor-pointer`}></i>
            </button>
        </div>

        {/* Center Links (Desktop) */}
        {token && (
            <ul className="hidden md:flex md:space-x-6 font-medium">
            <li>
                <NavLink 
                    to="/"
                    className={({ isActive }) =>
                        isActive 
                            ? "text-green-600 " 
                            : "hover:text-green-600 transition"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/products"
                    className={({ isActive }) =>
                        isActive 
                            ? "text-green-600 " 
                            : "hover:text-green-600 transition"
                    }
                >
                    Products
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/categories"
                    className={({ isActive }) =>
                        isActive 
                            ? "text-green-600 " 
                            : "hover:text-green-600 transition"
                    }
                >
                    Categories
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/brands"
                    className={({ isActive }) =>
                        isActive 
                            ? "text-green-600 " 
                            : "hover:text-green-600 transition"
                    }
                >
                    Brands
                </NavLink>
            </li>
            </ul>
        )}

        {/* Right Side Icons (Desktop) */}
        <ul className="hidden md:flex items-center space-x-6 text-[#0AAD0A]">
            {token ? (
            <>
                {/* Cart */}
                <li className="relative">
                <NavLink to="/cart">
                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                    {numOfCart > 0 && (
                    <span className="absolute -top-2 -end-3 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {numOfCart}
                    </span>
                    )}
                </NavLink>
                </li>

                {/* Wishlist */}
                <li className="relative">
                <NavLink to="/wishlist">
                    <i className="fa-solid fa-heart text-xl text-red-600"></i>
                    {wishlistCounter > 0 && (
                    <span className="absolute -top-2 -end-3 bg-[#0AAD0A] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {wishlistCounter}
                    </span>
                    )}
                </NavLink>
                </li>

                {/* Profile Dropdown */}
                <li className="relative text-gray-700 dark:text-gray-400">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-1 cursor-pointer"
                >
                    <i className="fa-solid fa-user text-xl"></i>
                    <span className="font-bold ">Hi, {localStorage.getItem("userName")?.split(" ")[0]}</span>
                    <i className="fa-solid fa-caret-down"></i>
                </button>

                {dropdownOpen && (
                    <ul className="absolute right-0 mt-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 shadow-lg rounded-md text-sm min-w-[150px]">
                    <li>
                        <NavLink
                        to="/allOrders"
                        className="block px-4 py-2 hover:text-[#0AAD0A] dark:hover:text-[#fff]"
                        onClick={() => setDropdownOpen(false)}
                        >
                        All Orders
                        </NavLink>
                    </li>
                    <li>
                        <button
                        onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:text-[#0AAD0A] dark:hover:text-[#fff] cursor-pointer"
                        >
                        Logout
                        </button>
                    </li>
                    </ul>
                )}
                </li>
            </>
            ) : (
            <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </>
            )}
        </ul>
        </div>

        {/* Mobile Menu */}
        {navToggle && (
        <div className="md:hidden px-4 pb-4 space-y-4">
            {token && (
            <ul className="flex flex-col space-y-2 font-medium items-center">
                <li><NavLink to="/" onClick={() => setNavToggle(false)}>Home</NavLink></li>
                <li><NavLink to="/products" onClick={() => setNavToggle(false)}>Products</NavLink></li>
                <li><NavLink to="/categories" onClick={() => setNavToggle(false)}>Categories</NavLink></li>
                <li><NavLink to="/brands" onClick={() => setNavToggle(false)}>Brands</NavLink></li>
            </ul>
            )}

            {/* Icons under links */}
            <ul className="flex justify-center space-x-6 pt-4 border-t ">
            <li>
                <NavLink to="/cart" onClick={() => setNavToggle(false)}>
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                </NavLink>
            </li>
            <li>
                <NavLink to="/wishlist" onClick={() => setNavToggle(false)}>
                <i className="fa-solid fa-heart text-xl text-red-600"></i>
                </NavLink>
            </li>
            <li>
                <NavLink to="/" onClick={() => setNavToggle(false)}>
                <i className="fa-solid fa-user text-xl"></i>
                </NavLink>
            </li>
            </ul>
        </div>
        )}
    </nav>
);

}

export default Navbar;


import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Brands from '../components/Brands/Brands'
import Cart from '../components/Cart/Cart'
import Categories from '../components/Categories/Categories'
import Home from '../components/Home/Home'
import Layout from '../components/Layout/Layout'
import Login from '../components/Login/Login'
import NotFound from '../components/NotFound/NotFound'
import Products from '../components/Products/Products'
import Register from '../components/Register/Register'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import Payment from '../components/Payment/Payment'
import AllOrders from '../components/AllOrders/AllOrders'
import WishList from '../components/WishList/WishList'
import SpecificBrand from '../components/SpecificBrand/SpecificBrand'
import SpecificCategory from '../components/SpecificCategory/SpecificCategory'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword'
import VerifyCode from '../components/VerifyCode/VerifyCode'
import ResetPassword from '../components/ResetPassword/ResetPassword'

function AppRoutes() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route element={<ProtectedRoute />}>
                    <Route index element={<Home />} />   
                    <Route path="/cart" element={<Cart />} />   
                    <Route path="/products" element={<Products />} />   
                    <Route path="/categories" element={<Categories />} />   
                    <Route path="/brands" element={<Brands />} /> 
                    
                    <Route path="productDetails/:id/:category" element={<ProductDetails />} />
                    <Route path="payment" element={<Payment />}/>
                    <Route path="allOrders" element={<AllOrders />}/>
                    <Route path="wishlist" element={<WishList />} />
                    <Route path="/brand/:brandId" element={<SpecificBrand />} />
                    <Route path="/category/:categoryId" element={<SpecificCategory />} />
                </Route>

                <Route path="/login" element={<Login />} />   
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/verifyCode" element={<VerifyCode/>} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
        </>
    )
}

export default AppRoutes;

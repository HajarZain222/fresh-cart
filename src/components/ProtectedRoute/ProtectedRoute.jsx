import React from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate, Outlet } from 'react-router-dom'
function ProtectedRoute() {
    if (localStorage.getItem('token')) {
        return <Outlet />
    }
    else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute
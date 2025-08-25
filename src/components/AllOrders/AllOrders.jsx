import React from 'react'
import emptyOrders from '../../assets/emptyOrders.svg'
import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'

function AllOrders() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    function getOrders(userId, token) {
        return axios.get(`${baseUrl}/orders/user/${userId}`, {
            headers: {
                token: token
            }
        })
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ['orders', userId],
        queryFn: () => getOrders(userId, token),
        enabled: !!token && !!userId,
        staleTime: 5000,
        retry: 3,
        retryDelay: 3000,
        select: (data) => data.data, 
    })

    console.log(data);
    const orders = data || []

    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#0AAD0A" size={70} />
        </div>
        )
    }

    if (isError) {
        return (
        <div className="flex justify-center items-center h-screen">
            <h1>Something went wrong</h1>
        </div>
        )
    }

    return (
        <>
        {orders.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-10">
            {[...orders]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((order) => (
                <div
                key={order._id}
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-400 shadow-md rounded-2xl p-6 border border-green-600 hover:shadow-lg transition"
                >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800">
                    Order #{order.id}
                    </h3>
                    <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                    >
                    {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                </div>

                {/* User Info */}
                <div className="text-sm text-gray-600 dark:text-gray-200 mb-3">
                    <p>
                    <span className="font-medium">Customer:</span>{" "}
                    {order.user?.name}
                    </p>
                    <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {order.shippingAddress?.phone}
                    </p>
                    <p>
                    <span className="font-medium">City:</span>{" "}
                    {order.shippingAddress?.city}
                    </p>
                </div>

                {/* Cart Items */}
                <div className="space-y-2 mb-4">
                    {order.cartItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center border-b pb-1"
                    >
                        <span className="text-gray-700 dark:text-gray-500 text-sm">
                        {item.product?.title?.split(" ").slice(0, 3).join(" ")}
                        </span>
                        <span className="font-semibold text-gray-800">
                        {item.price} EGP × {item.count}
                        </span>
                    </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-green-600">
                    {order.totalOrderPrice} EGP
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="title pb-10">You don't have any orders yet.</h2>
            <img
                src={emptyOrders}
                alt="all orders"
                className="w-[500px] h-auto object-contain"
            />
            </div>
        )}
        </>
    )
}

export default AllOrders

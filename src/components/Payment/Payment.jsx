import React, { useContext, useState } from 'react'
import Style from './Payment.module.css'
import { baseUrl, baseUrlFrontend } from '../../utils/baseUrl'
import { useFormik } from 'formik'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
function Payment() {

    const navigate = useNavigate()

    const [cash, setCash] = useState(false)

    let {cartId} = useContext(CartContext)

    let token = localStorage.getItem('token')
    function handleCashPayment(values) {

        axios.post(`${baseUrl}/orders/${cartId}`, 
            {
                shippingAddress: values  
            }, {
            headers: {
                token: token
            }
            })
            .then((res) => {
                console.log(res.data)
                navigate('/allOrders')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handleOnlinePayment(values) {

        axios.post(`${baseUrl}/orders/checkout-session/${cartId}`, 
            {
                shippingAddress: values  
            }, {
            headers: {
                token: token
            },
            params: {
                url: baseUrlFrontend
            }
            })
            .then((res) => {
                console.log(res.data)
                window.open(res.data.session.url, "_self")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handlePayment(values) {
        if(cash) {
            handleCashPayment(values)
        } else {
            handleOnlinePayment(values)
        }
    }

    let formikPayment = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: handlePayment
    })

    return (
        <>
        <Helmet>
            <title>Payment</title>
        </Helmet>
        
        <form onSubmit={formikPayment.handleSubmit} className="max-w-xl mx-auto pt-10">
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    onBlur={formikPayment.handleBlur}
                    onChange={formikPayment.handleChange}
                    value={formikPayment.values.details}
                    type="text" 
                    name="details" 
                    id="details" 
                    className="input w-full" 
                    placeholder="Enter Your details" 
                />
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    onBlur={formikPayment.handleBlur}
                    onChange={formikPayment.handleChange}
                    value={formikPayment.values.phone}
                    type="tel"
                    name="phone" 
                    id="phone" 
                    className="input w-full" 
                    placeholder="Enter Your phone" 
                />
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    onBlur={formikPayment.handleBlur}
                    onChange={formikPayment.handleChange}
                    value={formikPayment.values.city}
                    type="text"
                    name="city" 
                    id="city" 
                    className="input w-full" 
                    placeholder="Enter Your city" 
                />
            </div>
            <div className='flex justify-between'>
                <button 
                onClick={() => setCash(true)}
                type="submit" className="btn-green mx-auto">
                {/* {isLoading ? <i className='fas fa-spin fa-spinner'></i> : "Cash Payment"} */}
                Cash Payment
            </button>
            <button 
                onClick={() => setCash(false)}
                type="submit" className="btn-red mx-auto">
                {/* {isLoading ? <i className='fas fa-spin fa-spinner'></i> : "Online Payment"} */}
                Online Payment
            </button>
            </div>
        </form>
        </>
    )
}

export default Payment
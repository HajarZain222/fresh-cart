import React, { useContext, useState } from 'react';
import Style from './Register.module.css';
import { baseUrl } from '../../utils/baseUrl'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';
function Register() {
    const {setToken} = useContext(UserContext)
    const [errorApi, setErrorApi] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    let navigate = useNavigate()

    async function handleRegister(values) {
        setIsLoading(true)
        console.log(values);

        let {data} =  await axios.post(
            `${baseUrl}/auth/signup`, values)
            .then((res) => {
                console.log(res.data.token);
                setToken(res.data.token)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userName", res.data.user.name)
                navigate("/")
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setErrorApi(error.response.data.message)
                setIsLoading(false)
            })
        console.log(data);
    }

    let validationSchema = Yup.object().shape(
        {
            name: Yup.string().min(3, "Name minimum 3 characters").max(10, "Name maximum 10 characters").required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "Password must contain captial Char & small char & number & min 6 char & max 10 char").required("Password is required"),
            rePassword: Yup.string().oneOf([Yup.ref("password"), null], "rePassword must match Password").required("rePassword is required"),
            phone: Yup.string().matches(/01[1250][0-9]{8}$/, "Phone must be Egyption number").required("Number is required")
        }
    ) 

    const formikRegister =  useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema, // = validationSchema: validationSchema,
        onSubmit: handleRegister,

    })

    return (
        <>
        {errorApi 
            ?
            <div 
                className='p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dar:bg-gray-800 dark:text-red-400'
                role='alert'
            >
                {errorApi}
            </div>
            :
            null
        }
        <h2 className='title'>Register Now</h2>
        <form onSubmit={formikRegister.handleSubmit} className="max-w-xl mx-auto">
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    onBlur={formikRegister.handleBlur}
                    onChange={formikRegister.handleChange}
                    value={formikRegister.values.name}
                    type="text" 
                    name="name" 
                    id="name" 
                    className="input w-full" 
                    placeholder="Enter Your Name" 
                />
                
                {formikRegister.errors.name && formikRegister.touched.name 
                ?
                <div 
                    className='p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dar:bg-gray-800 dark:text-red-400'
                    role='alert'
                >
                    {formikRegister.errors.name}
                </div>
                :
                null
                }
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    onBlur={formikRegister.handleBlur}
                    onChange={formikRegister.handleChange}
                    value={formikRegister.values.email}
                    type="email" 
                    name="email" 
                    id="email" 
                    className="input w-full" 
                    placeholder="Enter Your Email" 
                />
                
                {formikRegister.errors.email && formikRegister.touched.email 
                ?
                <div 
                    className='p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dar:bg-gray-800 dark:text-red-400'
                    role='alert'
                >
                    {formikRegister.errors.email}
                </div>
                :
                null
                }
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    onBlur={formikRegister.handleBlur}
                    onChange={formikRegister.handleChange}
                    value={formikRegister.values.password}
                    type="password"
                    name="password" 
                    id="password" 
                    className="input w-full" 
                    placeholder="Enter Your Password" 
                />
                
                {formikRegister.errors.password && formikRegister.touched.password 
                ?
                <div 
                    className='p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dar:bg-gray-800 dark:text-red-400'
                    role='alert'
                >
                    {formikRegister.errors.password}
                </div>
                :
                null
                }
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    onBlur={formikRegister.handleBlur}
                    onChange={formikRegister.handleChange}
                    value={formikRegister.values.rePassword}
                    type="password"
                    name="rePassword" 
                    id="rePassword" 
                    className="input w-full" 
                    placeholder="Enter Your Password Again" 
                />
                
                {formikRegister.errors.rePassword && formikRegister.touched.rePassword 
                ?
                <div 
                    className='p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dar:bg-gray-800 dark:text-red-400'
                    role='alert'
                >
                    {formikRegister.errors.rePassword}
                </div>
                :
                null
                }
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    onBlur={formikRegister.handleBlur}
                    onChange={formikRegister.handleChange}
                    value={formikRegister.values.phone}
                    type= "tel"
                    name="phone" 
                    id="phone" 
                    className="input w-full" 
                    placeholder="Enter Your Phone" 
                />
                
                {formikRegister.errors.phone && formikRegister.touched.phone 
                ?
                <div 
                    className='p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dar:bg-gray-800 dark:text-red-400'
                    role='alert'
                >
                    {formikRegister.errors.phone}
                </div>
                :
                null
                }
            </div>
            <button 
                disabled = {!formikRegister.isValid || !formikRegister.dirty? true : false}
                type="submit" className="btn-green block mx-auto">
                {isLoading ? <i className='fas fa-spin fa-spinner'></i> : "Register"}
            </button>
        </form>
        </>
    )
}

export default Register
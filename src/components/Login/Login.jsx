import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { baseUrl } from '../../utils/baseUrl'
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { jwtDecode } from "jwt-decode";


function Login() {
    const { setToken } = useContext(UserContext);

    const [errorApi, setErrorApi] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    async function handleLogin(values) {
        setIsLoading(true);
        setErrorApi(null);

        try {
        let res = await axios.post(
            `${baseUrl}/auth/signin`,
            values
        );

        const token = res.data.token;
        const decoded = jwtDecode(token);

        localStorage.setItem("token", token);
        localStorage.setItem("userId", decoded.id); 
        localStorage.setItem("userName", res.data.user.name);

        setToken(token);
        navigate("/");
        } catch (error) {
        console.log(error?.response?.data?.message || "Login failed");
        setErrorApi(error?.response?.data?.message || "Login failed");
        } finally {
        setIsLoading(false);
        }
    }

    let validationSchema = Yup.object().shape({
        email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
        password: Yup.string()
        .matches(
            /^[A-Za-z0-9]{6,10}$/,
            "Password must contain capital & small letters + numbers, min 6 chars, max 10"
        )
        .required("Password is required"),
    });

    const formikLogin = useFormik({
        initialValues: {
        email: "",
        password: "",
        },
        validationSchema,
        onSubmit: handleLogin,
    });

    return (
        <>
        {errorApi && (
            <div
            className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
            >
            {errorApi}
            </div>
        )}

        <h2 className="title">Login Now</h2>

        <form onSubmit={formikLogin.handleSubmit} className="max-w-xl mx-auto">
            <div className="relative z-0 w-full mb-5 group">
            <input
                onBlur={formikLogin.handleBlur}
                onChange={formikLogin.handleChange}
                value={formikLogin.values.email}
                type="email"
                name="email"
                id="email"
                className="input w-full"
                placeholder="Enter Your Email"
            />

            {formikLogin.errors.email && formikLogin.touched.email && (
                <div
                className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
                >
                {formikLogin.errors.email}
                </div>
            )}
            </div>

            <div className="relative z-0 w-full mb-5 group">
            <input
                onBlur={formikLogin.handleBlur}
                onChange={formikLogin.handleChange}
                value={formikLogin.values.password}
                type="password"
                name="password"
                id="password"
                className="input w-full"
                placeholder="Enter Your Password"
            />

            {formikLogin.errors.password && formikLogin.touched.password && (
                <div
                className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
                >
                {formikLogin.errors.password}
                </div>
            )}
            </div>

            <div className="flex justify-between ">
            <button
            disabled={!formikLogin.isValid || !formikLogin.dirty}
            type="submit"
            className="btn-green "
            >
            {isLoading ? <i className="fas fa-spin fa-spinner"></i> : "Login"}
            </button>
            <p className="text-sm text-center mt-4">
            Forgot your password?{" "}
            <Link to="/forgotPassword" className="text-green-600 underline">
                Reset here
            </Link>
            </p>

            </div>

        </form>
        </>
    );
}

export default Login;

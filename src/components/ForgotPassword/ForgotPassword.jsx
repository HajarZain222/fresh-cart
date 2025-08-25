import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
        let { data } = await axios.post(`${baseUrl}/auth/forgotPasswords`, {
            email,
        });
        setMessage("Check your email for the reset code");
        navigate("/verifyCode"); 
        } catch (err) {
        setMessage(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h2 className="title">Forgot Password</h2>
        <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
        />
        <button type="submit" className="btn-green block mx-auto mt-4">
            Send Reset Code
        </button>
        {message && <p className="mt-2 text-center">{message}</p>}
        </form>
    );
}

export default ForgotPassword;


import React, { useState } from "react";
import Style from './ResetPassword.module.css'
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (newPassword !== rePassword) {
        return setError("Passwords do not match");
        }
        try {
        await axios.put(`${baseUrl}/auth/resetPassword`, {
            email,
            newPassword,
        });
        navigate("/login");
        } catch (err) {
        setError(err.response?.data?.message || "Reset failed");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <h2 className="title">Reset Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input w-full mt-2"
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                className="input w-full mt-2"
            />
            <button type="submit" className="btn-green block mx-auto mt-4">
                Reset Password
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
    );
}

export default ResetPassword;

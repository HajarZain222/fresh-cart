import React, { useState } from "react";
import Style from './VerifyCode.module.css'
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";

function VerifyCode() {
    const [code, setCode] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
        await axios.post(`${baseUrl}/auth/verifyResetCode`, { resetCode: code });
        navigate("/resetPassword");
        } catch (err) {
        setError(err.response?.data?.message || "Invalid code");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h2 className="title">Enter Reset Code</h2>
        <input
            type="text"
            placeholder="Enter the code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input w-full"
        />
        <button type="submit" className="btn-green block mx-auto mt-4">
            Verify
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
    );
}

export default VerifyCode;

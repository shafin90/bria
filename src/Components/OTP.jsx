import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';
import { baseURL } from '../../baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OTP = () => {
    const [otp, setOTP] = useState('');
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseURL}/adminLogin/submitForgetPassOTP`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resetOTP: otp }),
            });
            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem('isAuthenticated', 'true');
                toast("OTP matched!");
                navigate('/reset-pass');
            } else {
                setErrors({ login: 'OTP doesnt match' });
            }
        } catch (error) {
            setErrors({ login: 'Failed to login. Please try again later.' });
        }


    };

    const formStyle = {
        backgroundColor: "#F9E7F8",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        width: "90%",
        height: "90%",
        maxHeight: "450px",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    };

    const headingStyle = {
        textAlign: "center",
        fontFamily: "sans-serif",
        color: "#414a4c",
        marginBottom: "20px"

    };



    return (
        <div className={styles.adminLoginWrapper}>
            <div style={formStyle}>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="otp">Enter The Given OTP</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}
                            required
                        />
                        
                    </div>
                    <p className={styles.forget_password} onClick={() => navigate("/admin-login")}>Back</p>

                    {errors.login && <span className={styles.error}>{errors.login}</span>}
                    <button className={styles.adminButton} type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OTP;
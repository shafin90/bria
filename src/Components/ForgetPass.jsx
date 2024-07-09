import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';
import { baseURL } from '../../baseUrl';

const ForgetPass = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!validateEmail(email)) {
            validationErrors.email = 'Invalid email address';
        }

        if (password.length < 8) {
            validationErrors.password = 'Password must be at least 8 characters long';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            try {
                const response = await fetch(`${baseURL}/adminLogin/adminLogin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();

                if (data.success) {
                    sessionStorage.setItem('isAuthenticated', 'true');
                    navigate('/admin');
                } else {
                    setErrors({ login: 'Invalid email or password' });
                }
            } catch (error) {
                setErrors({ login: 'Failed to login. Please try again later.' });
            }
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
        color:"#414a4c",
        marginBottom: "20px"

    };
    


    return (
        <div className={styles.adminLoginWrapper}>
            <div style={formStyle}>
                <h2 style={headingStyle}>Enter Your Email</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <span className={styles.error}>{errors.email}</span>}
                    </div>


                    {errors.login && <span className={styles.error}>{errors.login}</span>}
                    <button className={styles.adminButton} type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPass;
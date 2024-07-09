import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';
import { baseURL } from '../../baseUrl';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const ResetPass = () => {
    const [email, setEmail] = useState('');

    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseURL}/adminLogin/resetPass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPass: password, confirmNewPass: confirmPassword }),
            });
            const data = await response.json();

            if (data.success) {
                toast("Successfully Reset Password!");
                sessionStorage.setItem('isAuthenticated', 'true');
                navigate('/admin-login');
            } else {
                setErrors({ login: 'Something went wrong. Please try again' });
            }
        } catch (error) {
            setErrors({ login: 'Failed to login. Please try again later.' });
        }

    };

    return (
        <div className={styles.adminLoginWrapper}>
            <div className={styles.loginForm}>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        
                    </div>
                    <p className={styles.forget_password} onClick={() => navigate("/admin-login")} >Back</p>
                    {errors.login && <span className={styles.error}>{errors.login}</span>}
                    <button className={styles.adminButton} type="submit">Reset Password</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ResetPass;
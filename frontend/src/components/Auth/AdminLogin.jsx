import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const handleLogin = async (e) =>{
        e.preventDefault();
        setError('');

        const API_URL = 'http://localhost:8000';
        try{
            const response = await axios.post(`${API_URL}/adminside/ad_login/`,{
                username,
                password,
            })
            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                navigate('/admin/dashboard');
            }
            
        }catch(error){
            console.error('Login error:', error);
            setError('Invalid credentials or not an admin.')
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Admin Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { saveTokens } from './TokenManagement'

const Login = () => {
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        username: '',
        password : '',
    })

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://127.0.0.1:8000/users/login/',formData)
            const { access, refresh } = response.data;
            saveTokens(access, refresh);
            navigate('/home')
        }catch (error) {
            setError('invalid username or password')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <br />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}

export default Login
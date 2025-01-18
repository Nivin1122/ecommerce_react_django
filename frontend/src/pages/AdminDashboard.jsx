import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/Auth/Api_config';

const AdminDashboard = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            const accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                navigate('/admin/login');
                return;
            }

            try {
                const response = await api.get('/adminside/dashboard/');
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error:', error);
                if (error.response && error.response.status === 403) {
                    alert('Access denied. Please log in as admin.');
                    localStorage.removeItem('access_token');
                    navigate('/admin/login');
                }
            }
        };

        fetchDashboard();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/admin/login');
    };


    const list_users = () => {
        navigate('/admin/users/')
    }

    const add_product = () => {
        navigate('/admin/add_products/')
    }

    return (
        <div className="dashboard-container">
            <h2>{message}</h2>
            <button onClick={list_users}>list users</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={add_product}>Add Product</button>
        </div>
    );
};

export default AdminDashboard;
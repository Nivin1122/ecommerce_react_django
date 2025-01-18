import React from 'react'
import { useNavigate } from 'react-router-dom'
import Product_listing from './Product_listing';

function Home() {
  const navigate = useNavigate();

  const accesstoken = localStorage.getItem('access_token')
  const refreshtoken = localStorage.getItem('refresh_token')

  const handleLogout = () =>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    navigate('/login')
  }

  return (
    <div>this is home page !!!

      <p><strong>Access Token:</strong> {accesstoken || 'Not available'}</p>
      <p><strong>Refresh Token:</strong> {refreshtoken || 'Not available'}</p>
      <button onClick={handleLogout}>logout</button>

      <Product_listing />
    </div>
  )
}

export default Home
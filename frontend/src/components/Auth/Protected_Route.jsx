import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected_Route = ({ children }) => {
    const accessToken = localStorage.getItem('access_token')

    return accessToken ? children : <Navigate to="/login" />
}

export default Protected_Route
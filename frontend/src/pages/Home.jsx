import React from "react"
import { useNavigate } from "react-router-dom"
import Product_listing from "./Product_listing"

function Home() {
  const navigate = useNavigate()

  const accessToken = localStorage.getItem("access_token")
  const refreshToken = localStorage.getItem("refresh_token")

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Home</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </header>

        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Authentication Info</h2>
          <p className="mb-2">
            <strong>Access Token:</strong>{" "}
            <span className="font-mono bg-gray-700 px-2 py-1 rounded">
              {accessToken ? `${accessToken.substr(0, 20)}...` : "Not available"}
            </span>
          </p>
          <p>
            <strong>Refresh Token:</strong>{" "}
            <span className="font-mono bg-gray-700 px-2 py-1 rounded">
              {refreshToken ? `${refreshToken.substr(0, 20)}...` : "Not available"}
            </span>
          </p>
        </div>

        <Product_listing />
      </div>
    </div>
  )
}

export default Home


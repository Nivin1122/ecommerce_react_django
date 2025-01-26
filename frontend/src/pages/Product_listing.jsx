import axios from "axios"
import React, { useEffect, useState } from "react"
import { ShoppingCart, CreditCard, Star, Heart } from "lucide-react"
import { addToCartAsync } from "../Slices/CartSlice"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const API_BASE_URL = "http://localhost:8000"

const Product_listing = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const dispatch = useDispatch();


  const handleAddToCart = (product) => {
    dispatch(addToCartAsync(product))
      .unwrap()
      .then(() => {
        toast.success('Product added to cart!');
        
      })
      .catch((error) => {
        toast.error('Failed to add product to cart');
      });
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = localStorage.getItem("access_token")
        const response = await axios.get(`${API_BASE_URL}/products/list_products`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        setProducts(response.data)
        setError(null)
      } catch (error) {
        console.error("There was an error fetching the products!", error)
        setError("Failed to fetch products. Please try again later.")
        if (error.response?.status === 401) {
          console.log("Unauthorized access - please login again")
        }
      }
    }

    fetchProducts()
  }, [])

  if (error) {
    return <div className="bg-red-600 text-white p-4 rounded-lg mt-4 animate-pulse">{error}</div>
  }

  return (
    <div className="py-12">
      <h2 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Featured Manga & Merchandise
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform group-hover:scale-105 bg-gray-800">
              <div className="absolute top-2 right-2 z-10">
                <button className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition duration-300 ease-in-out transform hover:scale-110">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-300">(4.5)</span>
                </div>
                <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-400">${product.price}</span>
                  <div className="space-x-2">
                    <button onClick={() => handleAddToCart(product)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </button>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product_listing


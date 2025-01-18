import axios from 'axios';
import React, { useEffect, useState } from 'react'


const API_BASE_URL = 'http://localhost:8000';

const Product_listing = () => {
    const [products,setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await axios.get(`${API_BASE_URL}/products/list_products`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                });
                setProducts(response.data);
                setError(null);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
                setError('Failed to fetch products. Please try again later.');
                if (error.response?.status === 401) {
                    console.log('Unauthorized access - please login again');
                }
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

  return (
    <div>
        <p>list_products</p>
        <div>
            {products.map(product => (
                <>
                    <img src={`http://localhost:8000${product.image}`} alt={product.name} />
                    <h3>{product.name}</h3>
                    <h4>{product.price}</h4>
                    <p>{product.description}</p>
                </>
            ))}
        </div>

    </div>
  )
}

export default Product_listing
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch} from 'react-redux';
import { Trash2, Plus, Minus } from 'lucide-react';
import { addToCart } from '../Slices/CartSlice';



const Cartpage = () => {

    const cartItems = useSelector(state=>state.cart.items)
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();


    const handleAddToCart = (product) =>{
        dispatch(addToCart(product))
    }

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
      };

      return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
          <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-400">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={`http://localhost:8000${item.image}`} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-green-400">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="bg-red-500 text-white p-1 rounded-full"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="bg-green-500 text-white p-1 rounded-full"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <span className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                <h3 className="text-2xl font-bold">Total</h3>
                <span className="text-2xl font-bold text-green-400">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>
      );
    };
    


export default Cartpage
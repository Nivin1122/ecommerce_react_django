import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCartItemsAsync,incrementQuantityAsync,decrementQuantityAsync,removeFromCartAsync } from "../slices/cartSlice"
// import { getCartItemsAsync, incrementQuantity, decrementQuantity, removeFromCart } from "../slices/cartSlice"
import { ShoppingCart, Plus, Minus, X, CreditCard } from "lucide-react"

const Cart = () => {
  const dispatch = useDispatch()
  const { items, status, totalQuantity, totalAmount, error } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(getCartItemsAsync())
  }, [dispatch])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantityAsync(itemId))
  }

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantityAsync(itemId))
  }

  const handleRemove = (itemId) => {
    dispatch(removeFromCartAsync(itemId))
  }

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log("Proceeding to checkout")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <ShoppingCart className="mr-4" size={32} />
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl mb-4">Your cart is empty</p>
            <a href="/" className="text-purple-500 hover:text-purple-400">
              Continue Shopping
            </a>
          </div>
        ) : (
          <>
            <ul className="space-y-6 mb-8">
              {items.map((item) => (
                <li key={item.id} className="bg-gray-800 rounded-lg p-6 flex items-center">
                  <img
                    src={`http://localhost:8000${item.product.image}`}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md mr-6"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                    <p className="text-gray-400 mb-2">Price: ${item.product.price}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="bg-gray-700 p-2 rounded-l-md hover:bg-gray-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="bg-gray-700 px-4 py-2">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="bg-gray-700 p-2 rounded-r-md hover:bg-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold mb-2">${item.total_price}</p>
                    <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-400">
                      <X size={24} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <span className="text-xl">Total Items:</span>
                <span className="text-xl font-bold">{totalQuantity}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-xl">Total Price:</span>
                <span className="text-xl font-bold">${totalAmount}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
              >
                <CreditCard className="mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart


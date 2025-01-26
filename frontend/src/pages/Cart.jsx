import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItemsAsync } from '../Slices/CartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, state, totalQuantity, totalAmount, error} = useSelector((state)=>state.cart)


    useEffect(()=>{
        dispatch(getCartItemsAsync())
    },[dispatch])

    if (status === 'loading') {
        return <div>Loading...</div>;
    }


  return (
    <div>
        <h1>Your Cart</h1>
        <div>Total Items: {totalQuantity}</div>
        <div>Total Price: ${totalAmount.toFixed(2)}</div>
        <ul>
        {items.map((item) => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <img 
              src={`http://localhost:8000${item.product.image}`} 
              alt={item.product.name} 
              style={{ width: '100px', height: '100px', marginRight: '20px' }}
            />
            <div style={{ flex: 1 }}>
              <h3>{item.product.name}</h3>
              <p>Price: ${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total Price: ${item.total_price}</p>
            </div>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Cart
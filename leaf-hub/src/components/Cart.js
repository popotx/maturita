import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cart', { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => setCartItems(response.data))
    .catch(error => console.error("Failed to fetch cart items:", error));
  }, []);

  const update = (productId, change) => {
    const item = cartItems.find(item => item.product_id === productId);
    if (change === -1 && item && item.quantity === 1) {
      // If the quantity is 1 and we're subtracting 1, it should be deleted
      axios.delete(`http://localhost:5000/cart/remove`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: { product_id: productId }
      })
      .then(() => fetchCart())
      .catch(error => console.error("Failed to delete item from cart:", error));
    } else {
      // Otherwise, update the quantity
      axios.post(`http://localhost:5000/cart/update`, { product_id: productId, change: change }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(() => fetchCart())
      .catch(error => console.error("Failed to update quantity:", error));
    }
  };
  
  


  const fetchCart = () => {
    axios.get('http://localhost:5000/cart', { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => setCartItems(response.data))
    .catch(error => console.error("Failed to fetch cart items:", error));
  };

  return (
    <div>
      <Navbar />
      <h2>Your Cart</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item.product_id}>
            <img src={`data:image/jpeg;base64,${item.image_data}`} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Price: {item.price}€</p>
            <p>Quantity: {item.quantity}
            <button onClick={() => update(item.product_id, 1)}>+</button>
            <button onClick={() => update(item.product_id, -1)}>-</button>

            </p>
            {/* Implement the removeFromCart function similar to updateQuantity */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;

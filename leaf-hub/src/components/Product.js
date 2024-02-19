
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import "../styles/Product.css"
import Navbar from './Navbar';

function Product() {
  let { productId } = useParams();
  const [product, setProduct] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    axios.post('http://localhost:5000/cart/add', {
      product_id: productId,
      quantity: 1 // or the selected quantity by the user
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Replace 'localStorage.getItem('token')' with your token retrieval method
      }
    })
    .then(response => {
      console.log(response.data.message); // Success feedback
      navigate('/cart'); // Redirect to the cart page
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
    });
  };

  return (
    <div className="nav-bar">
      <Navbar />
      <div className="product-container">
        <img src={`data:image/jpeg;base64,${product.image_data}`} alt={product.name} className="product-image" />
        <div className="product-information">
          <h2>{product.name}</h2>
          <h3>{product.price} €</h3>
          <div className="product-detail">{product.detail}</div>
          <button className="buttonL" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;

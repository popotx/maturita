import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import "../styles/Product.css"
import Navbar from './Navbar';

function Product() {
  let { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
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
      quantity: 1 
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    })
    .then(response => {
      console.log(response.data.message); 
      navigate('/cart'); 
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
    });
  };

  const toggleDescription = () => {
    setDescriptionExpanded(!descriptionExpanded);
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
            <div className="product-description">
              <button className="accordion" onClick={toggleDescription}>
                {descriptionExpanded ? "Hide Description" : "Show Description"}
              </button>
              {descriptionExpanded && (
                <div className="panel">
                  {product.description}
                </div>
              )}
            </div>
          <br></br><button className="buttonL" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;

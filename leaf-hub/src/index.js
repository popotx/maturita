import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/LoginPage';
import AboutUs from './components/AboutUs';
import Register from './components/RegisterPage';
import Cart from './components/Cart';
import Shop from './components/Shop';
import Product from './components/Product';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </Router>
  </React.StrictMode>
);


reportWebVitals();

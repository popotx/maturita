import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios'; 
import '../styles/Shop.css'; 
import Navbar from './Navbar.js';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Shop() {
    const [items, setItems] = useState([]); 
    const [category, setCategory] = useState('');
    const location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        const storedCategory = localStorage.getItem('selectedCategory');
        setCategory(storedCategory);
    }, [location]);

    useEffect(() => {
        
        axios.get('http://localhost:5000/products') 
            .then(response => {
                
                setItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the items!', error);
            });
    }, []);

    const filteredItems = useMemo(() => {
        return items.filter(item => item.component === category);
    }, [items, category]);

    return (
        <div className="product-details">
            <Navbar className="btn" />
            <div className="shop-page">
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    {filteredItems.map((item) => (
                        <div key={item.id} className="product-item">
                            <div className="card h-100">
                                <img className="card-img-top" src={`data:image/jpeg;base64,${item.image_data}`} alt={item.name} />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{item.name} - {item.price} €</h5>
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <button className="btn mt-auto" onClick={() => navigate(`/product/${item.id}`)}>View options</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shop;

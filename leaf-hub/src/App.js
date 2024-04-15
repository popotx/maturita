import React from 'react';
import { Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import obrazok1 from './pictures/image1.jpg';
import obrazok2 from './pictures/image2.jpg';
import obrazok3 from './pictures/image3.jpg';
import obrazok4 from './pictures/image4.jpg';
import './App.css'; 
import Navbar from './components/Navbar.js';
import { useNavigate } from 'react-router-dom';


function App() {
  let navigate = useNavigate();
  
  const handleClick = (category) => {
    localStorage.setItem('selectedCategory', category);
    navigate("/shop");
  };

  return (
    <div className="App">
      <Navbar />
      <Carousel controls={false}  className="rounded-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={obrazok1}
            alt="First slide"
            style={{ minHeight: '100vh', maxHeight: '100vh' }}
          />
          <Carousel.Caption>
            <h3>LEAF HUB</h3>
            <p>exotic plants within reach.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100" 
            src={obrazok2}
            alt="Second slide"
            style={{ minHeight: '100vh', maxHeight: '100vh' }}
          />
          <Carousel.Caption>
            <h3>Japanese trees</h3>
            <p>BONSAI</p>
            <button className="buttonM" type="submit" onClick={() => handleClick('Plants')}>VIEW COLLECTION</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={obrazok3}
            alt="Third slide"
            style={{ minHeight: '100vh', maxHeight: '100vh' }}
          />
          <Carousel.Caption>
            <h3>Gear For Your Needs</h3>
            <p>GEAR</p>
            <button className="buttonM" type="submit" onClick={() => handleClick('Gear')}>VIEW COLLECTION</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={obrazok4}
            alt="First slide"
            style={{ minHeight: '100vh', maxHeight: '100vh' }}
          />
          <Carousel.Caption>
            <h3>Breathe Air</h3>
            <p>TREES</p>
            <button className="buttonM" type="submit" onClick={() => handleClick('Trees')}>VIEW COLLECTION</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default App;

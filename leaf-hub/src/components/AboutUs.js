import React, { useRef } from 'react';
import Navbar from './Navbar.js';
import '../styles/AboutUS.css'; // make sure to create an AboutUs.css file in the same directory
import avatar from '../pictures/avatar.jpg';

const AboutUs = () => {
    const moreTextRef = useRef(null); // Create a ref for the more text section

    const scrollToMoreText = () => {
        moreTextRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="about-us">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="profile-frame">
                <img 
                src={avatar} 
                alt="Profile" 
                className="profile-picture" />
            </div>
            <div className="about-text">
                <h2>ABOUT US</h2>
                <p>
                    Vitajte v našom online obchode s rastlinami! Sme váš spoľahlivý zdroj pre krásne a zdravé rastliny, ktoré osviežia váš domov alebo kanceláriu. Naša vášeň pre záhradníctvo nám umožňuje ponúkať široký výber rôznych druhov rastlín, od kvitnúcich kaskád po exotické sukulenty.
                    Pri nakupovaní u nás môžete mať istotu, že dostanete kvalitné rastliny, ktoré sú starostlivo vybrané a starostlivo zabalíme...
                </p>
                <button className="read-more" onClick={scrollToMoreText}>READ MORE</button>
            </div>
            {/* This div could be the target for the "READ MORE" scroll */}
            <div ref={moreTextRef} className="more-text">
                {/* Additional content to be revealed goes here */}
            </div>
        </div>
    );
};

export default AboutUs;

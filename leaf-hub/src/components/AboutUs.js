import React, { useRef } from 'react';
import Navbar from './Navbar.js';
import '../styles/AboutUS.css'; 
import avatar from '../pictures/avatar.jpg';

const AboutUs = () => {
    const moreTextRef = useRef(null); 

    const scrollToMoreText = () => {
        window.scrollBy({
            top: 74 * parseFloat(getComputedStyle(document.documentElement).fontSize),
            behavior: 'smooth'
        });
    };

    return (
        <><div className="about-us">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="profile-frame">
                <img
                    src={avatar}
                    alt="Profile"
                    className="profile-picture"/>
            </div>
            <div className="about-text">
                <h2>ABOUT US</h2>
                <p>
                    Vitajte v našom online obchode s rastlinami! Sme váš spoľahlivý zdroj pre krásne a zdravé rastliny, ktoré osviežia váš domov alebo kanceláriu.
                    Naša vášeň pre záhradníctvo nám umožňuje ponúkať široký výber rôznych druhov rastlín, od kvitnúcich kaskád po exotické sukulenty.
                    Pri nakupovaní u nás môžete mať istotu, že dostanete kvalitné rastliny, ktoré sú starostlivo vybrané a starostlivo zabalíme...
                </p>
                <button className="read-more" onClick={scrollToMoreText}>READ MORE</button>
            </div>

            <div ref={moreTextRef} className="more-text">

            </div>
        </div><div className='expand'>
                <div className='text'>
                    <p className='pismo'>
                        Vitajte v našom online obchode s rastlinami, kde sa zaoberáme poskytovaním neustálej podpory pre vaše záhradnícke vášne! Sme vaším dôveryhodným sprievodcom do sveta krásnych a zdravých rastlín, ktoré osviežia váš domov, kanceláriu alebo akýkoľvek iný priestor, ktorý chcete oživiť zeleňou.
                        Naša vášeň pre záhradníctvo nám umožňuje poskytovať široký výber rôznych druhov rastlín, ktoré zahŕňajú nielen tradičné kvitnúce kaskády, ale aj exotické sukulenty a zaujímavé kaktusy.
                        <br></br><br></br> Bez ohľadu na to, či preferujete pestovanie vnútorných rastlín, aby ste vytvorili útulný kútik v interiéri, alebo sa zameriavate na rozšírenie svojej záhrady o nové druhy, sme tu, aby sme vám pomohli pri výbere toho najlepšieho.
                        Pri nakupovaní u nás môžete mať istotu, že dostanete nielen kvalitné rastliny, ale aj odborné poradenstvo a podporu od nášho tímu záhradných odborníkov.<br></br><br></br> Každá rastlina je starostlivo vybraná, aby zaručila vašu spokojnosť, a s maximálnou starostlivosťou zabalíme, aby sme zabezpečili, že dorazí ku vám v bezchybnom stave.
                        Okrem toho neustále pracujeme na rozširovaní našej ponuky o nové druhy rastlín a príslušenstva, aby sme vám mohli ponúknuť ešte viac možností pre vaše záhradnícke projekty. Sledujte náš obchod a buďte vždy informovaní o najnovších prírastkoch do našej zbierky.
                        Vaša spokojnosť je pre nás prioritou číslo jeden a sme tu, aby sme vám pomohli vytvoriť krásne a zdravé zelené prostredie, ktoré bude vyhovovať vašim potrebám a predstavám. Ďakujeme vám, že ste si vybrali nás ako svojho partnera pre záhradnícke potreby, a tešíme sa na to, že vám pomôžeme pri každom kroku vašej záhradníckej cesty.
                    </p>
                </div>
            </div></>
    );
};
export default AboutUs;

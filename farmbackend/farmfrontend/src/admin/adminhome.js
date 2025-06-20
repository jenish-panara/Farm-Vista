import ADMIN_NAVBAR from './adminnavbar'
import FOOTER from '../user/footer'
import min1 from '../img/min.icon1.webp'
import min2 from '../img/min.icon2.webp'
import min3 from '../img/min.icon3.webp'
import min4 from '../img/min.icon4.webp'
import min5 from '../img/min.icon5.webp'
import min6 from '../img/min.icon6.webp'
import video from '../img/video1.mp4'
import build1 from '../img/build1.webp'
import build2 from '../img/build2.webp'
import l1 from '../img/l1.svg'
import l2 from '../img/l2.svg'
import l4 from '../img/l4.svg'
import l3 from '../img/l3.svg'
import c1 from '../img/c1.webp'
import c2 from '../img/c2.webp'
import c3 from '../img/c3.webp'
import c4 from '../img/c4.webp'
import c5 from '../img/c5.webp'
import c6 from '../img/c6.webp'
import c7 from '../img/c7.webp'
import c8 from '../img/c8.webp'
import c9 from '../img/c9.webp'
import c10 from '../img/c10.webp'
import c11 from '../img/c11.webp'
import c12 from '../img/c12.webp'
import bi1 from '../img/bi1.png'
import bi2 from '../img/bi2.png'
import bi3 from '../img/bi3.png'
import bi4 from '../img/bi4.png'
import bi5 from '../img/bi5.png'
import bi6 from '../img/bi6.png'
import bi7 from '../img/bi7.png'
import bi8 from '../img/bi8.png'
import bi9 from '../img/bi9.png'
import bi10 from '../img/bi10.png'
import bi11 from '../img/bi11.png'
import bi12 from '../img/bi12.png'
import CountUp from 'react-countup';
import '../home.css'
import { useLocation } from 'react-router-dom';
import React, { useState,useEffect,useRef } from 'react';

function ADMIN_HOME(){

    const images = [
        { src: bi1, alt: 'Image 1' },
        { src: bi2, alt: 'Image 2' },
        { src: bi3, alt: 'Image 3' },
        { src: bi4, alt: 'Image 4' },
        { src: bi5, alt: 'Image 1' },
        { src: bi6, alt: 'Image 2' },
        { src: bi7, alt: 'Image 3' },
        { src: bi8, alt: 'Image 4' },
        { src: bi9, alt: 'Image 1' },
        { src: bi10, alt: 'Image 2' },
        { src: bi11, alt: 'Image 3' },
        { src: bi12, alt: 'Image 4' },
    ]
    const query = new URLSearchParams(useLocation().search);
    const username = query.get('username');
    const email = query.get('email');

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const [inView, setInView] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            });
        });
        if (statsRef.current) {
            observer.observe(statsRef.current);
        }
        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    return(
        <>
            <ADMIN_NAVBAR />
            <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
                <video id="" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                    <source src={video} type="video/mp4" />
                </video>
                <div className="hero-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
                    <h1>India's Largest Integrated Fruits and Vegetables Value Chain</h1>
                    <p>A company of the farmers, by the farmers and for the farmers.</p>
                </div>
            </div>

            <br></br>
            <div style={{marginTop:'50px'}}>
            <h1 style={{color:"black",fontSize:'40px',fontFamily:'sans-serif'}}>Welcome to <span style={{color:'#5A8149'}}> vanspati fram </span></h1>
            <br></br>
            <div className="containerr" ref={statsRef}>
                <div className="stat">
                    <img src={min6} alt="Farmers" />
                    <h2>{inView ? <CountUp start={0} end={18000} duration={3} separator="," /> : '0'}+</h2>
                    <p>Registered farmers</p>
                </div>
                <div className="stat">
                    <img src={min2} alt="Land" />
                    <h2>{inView ? <CountUp start={0} end={30000} duration={3} separator="," /> : '0'}+</h2>
                    <p>Acres of land</p>
                </div>
                <div className="stat">
                    <img src={min3} alt="Villages" />
                    <h2>{inView ? <CountUp start={0} end={252} duration={3} separator="," /> : '0'}+</h2>
                    <p>Villages covered</p>
                </div>
                <div className="stat">
                    <img src={min4} alt="Countries" />
                    <h2>{inView ? <CountUp start={0} end={42} duration={3} separator="," /> : '0'}+</h2>
                    <p>Countries served</p>
                </div>
                <div className="stat">
                    <img src={min1} alt="Customers" />
                    <h2>{inView ? <CountUp start={0} end={110} duration={3} separator="," /> : '0'}+</h2>
                    <p>Customers worldwide</p>
                </div>
                <div className="stat">
                    <img src={min5} alt="Years" />
                    <h2>{inView ? <CountUp start={0} end={12} duration={3} separator="," /> : '0'}+</h2>
                    <p>Years in the industry</p>
                </div>
            </div>
            </div>

            
            <section className="about-section">
                <div className="about-text">
                    <h2 className="fade-in-text">About Vanspati Farms</h2>
                    <p className="fade-in-text">Vanspati is India's largest integrated platform for fruits and vegetables. Company via its unique inclusive partnership with farmers has built a strong capability over the years in areas of primary processing of F&V, semi-processed products like frozen & aseptic; processed products like fruit jams; tomato ketchup; fruit beverages and F&V waste processing under an integrated zero discharge processing facility.</p>
                    <p className="fade-in-text">Vanspati Farms began with the mission to ensure that the small-landholding farmers of India are given fair compensation for their produce and labour. This was to be achieved while ensuring that we adhere to global standards of agricultural practices, world-class infrastructure, international food safety standards, and the will to deliver safe, hygienic, and healthy food to our consumers.</p>
                    <a href="" class="btn fade-in-text">Our Story</a>
                </div>
                <div class="about-image slide-in-image">
                    <img src={build1}/>
                </div>
            </section>

            <section className="infrastructure-section">
                <div className="infrastructure-image">
                    <img src={build2}/>
                </div>
                <div className="infrastructure-text">
                    <h2>Infrastructure and Technology</h2>
                    <h3>Infrastructure</h3>
                    <p>We invite you to visit our world-class infrastructure at <strong>Mohadi, Nashik</strong>, where we have installed state-of-the-art facilities to ensure that we work at necessary scales and guarantee safety and quality to our customers.</p>
                    <h3>Technology</h3>
                    <p>Right from ensuring that our farmers receive complete monitoring of growing practices to implementation of SAP, right from using 100% real-time traceable supply chain software to give transparency to our farmers and consumers, we have ensured that technology is encoded in our DNA.</p>
                    <a href="#" className="btn">Read More</a>
                </div>
            </section>

            <div className="container1">
                <div className="box1">
                    <img src={l1}/>
                    <h3>Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)</h3>
                    <p>This scheme provides financial assistance to small and marginal farmers to help them purchase inputs for crop health and yield. The scheme provides Rs 6,000 per year to farmers in three equal installments through Direct Benefit Transfer (DBT).</p>
                    <button style={{color:'#5d6a44',borderRadius:'5px',margin:'20px', width:'120px',height:'35px',fontSize:'15px'}}><a style={{textDecoration:'None'}} href="https://timesofindia.indiatimes.com/india/empowering-indias-farmers-list-of-schemes-for-welfare-of-farmers-in-india/articleshow/107854121.cms">Read More</a></button>
                </div>
                <div className="box1">
                    <img src={l2}/>
                    <h3>Pradhan Mantri Krishi Sinchai Yojana (PMKSY)</h3>
                    <p>It was formed by combining the Accelerated Irrigation Benefit Programme (AIBP), Integrated Watershed Management Programme (IWMP), and the On Farm Water Management (OFWM). </p>
                    <button style={{color:'#5d6a44',borderRadius:'5px',margin:'20px', width:'120px',height:'35px',fontSize:'15px'}}><a style={{textDecoration:'None'}} herf="https://www.eximbankindia.in/Assets/Dynamic/PDF/Publication-Resources/Newsletters/105file.pdf">Read More</a></button>
                </div>
                <div className="box1">
                    <img src={l3} />
                    <h3>National Food Security Mission (NFSM)</h3>
                    <p> its primary objectives include increasing the production of specific crops, promoting sustainable agriculture practices, and improving the nutritional standards of the population.</p>
                    <button style={{color:'#5d6a44',borderRadius:'5px',margin:'20px', width:'120px',height:'35px',fontSize:'15px'}}><a style={{textDecoration:'None'}} herf="https://www.nfsm.gov.in/">Read More</a></button>
                </div>
                <div className="box1">
                    <img src={l4} />
                    <h3>Soil Health Card</h3>
                    <p> the program is designed to help farmers make informed decisions regarding soil management and fertilizer use, thereby improving crop yields and ensuring environmental sustainability.</p>
                    <button style={{color:'#5d6a44',borderRadius:'5px',margin:'20px', width:'120px',height:'35px',fontSize:'15px'}}><a style={{textDecoration:'None'}} herf="https://soilhealth.dac.gov.in/home">Read More</a></button>
                </div>
            </div>

            <div className="container2">
                <h2>Our Licences and <span style={{color: '#6e8c46'}}>Certifications</span></h2>
                <div className="certifications">
                    <img src={c1} alt="1"/>
                    <img src={c2} alt="2"/>
                    <img src={c3} alt="3"/>
                    <img src={c4} alt="4"/>
                    <img src={c5} alt="5"/>
                    <img src={c6} alt="6"/>
                    <img src={c7} alt="7"/>
                    <img src={c8} alt="8"/>
                    <img src={c9} alt="9"/>
                    <img src={c10} alt="10"/>
                    <img src={c11} alt="11"/>
                    <img src={c12} alt="12"/>
                </div>
            </div>

            <div className="carousel12" style={{height:'350px'}}>
                {/* <button className="carousel-control prev1" onClick={goToPrevious}>
                    ❮
                </button> */}
                <div>
                    <h1 style={{color:'white'}}>Our Esteemed Customers</h1>
                </div>
                <div className="carousel-slides12" style={{marginTop:'10px',display:'flex',}}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-slide12 ${index === currentIndex ? 'active' : ''}`}
                            style={{ transform: `translateX(${-currentIndex * 100}%)` ,alignItems:'center'}}
                        >
                            <img src={image.src} style={{width:'300px',height:'150px',margin:'30px'}} alt={image.alt} />
                        </div>
                    ))}
                </div>
                {/* <button className="carousel-control next1" onClick={goToNext}>
                    ❯
                </button> */}
            </div>

            <FOOTER/>
        </>
    )
}
export default ADMIN_HOME
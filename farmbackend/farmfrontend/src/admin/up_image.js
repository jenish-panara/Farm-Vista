import ADMIN_NAVBAR from "./adminnavbar";
import FOOTER from '../user/footer';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import pc1 from '../img/productbanner.jpg'
import pc2 from '../img/productbanner1.jpg'
import '../appo.css';
import '../product.css'

function UP_IMG() {

    const query = new URLSearchParams(useLocation().search);
    const adminname = query.get('username');
    const adminemail = query.get('email');
    const [csrfToken, setCsrfToken] = useState('');

    const images = [pc2,pc1];

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
        const getCsrfToken = async () => {
            const response = await fetch('http://localhost:8000/api/get-csrf-token/');
            const data = await response.json();
            setCsrfToken(data.csrfToken);
        };
        getCsrfToken();
    }, []);

    const [images1, setImages1] = useState([]);
    useEffect(() => {
        const formData1 = new FormData();
        formData1.append('categorie','FRUIT')
        fetch('http://localhost:8000/api/images/get/',{method:'POST', headers : {'X-CSRFToken': csrfToken,} ,body:formData1,})
            .then(response => response.json())
            .then(data => setImages1(data))
            .catch(error => console.error('Error fetching images:', error)); 
    }, []);

    const [images2, setImages2] = useState([]);
    useEffect(() => {
        const formData1 = new FormData();
        formData1.append('categorie','VEGETABLE')
        fetch('http://localhost:8000/api/images/get/',{method:'POST',headers : {'X-CSRFToken': csrfToken,} ,body:formData1,})
            .then(response => response.json())
            .then(data => setImages2(data))
            .catch(error => console.error('Error fetching images:', error)); 
    }, []);

    const [images3, setImages3] = useState([]);
    useEffect(() => {
        const formData1 = new FormData();
        formData1.append('categorie','GRAIN')
        fetch('http://localhost:8000/api/images/get/',{method:'POST',headers : {'X-CSRFToken': csrfToken,} ,body:formData1,})
            .then(response => response.json())
            .then(data => setImages3(data))
            .catch(error => console.error('Error fetching images:', error)); 
    }, []);

    const [images4, setImages4] = useState([]);
    useEffect(() => {
        const formData1 = new FormData();
        formData1.append('categorie','DRYFRUIT')
        fetch('http://localhost:8000/api/images/get/',{method:'POST',headers : {'X-CSRFToken': csrfToken,} ,body:formData1,})
            .then(response => response.json())
            .then(data => setImages4(data))
            .catch(error => console.error('Error fetching images:', error)); 
    }, []);

    const [showForm, setShowForm] = useState(false);
    const [image, setImage] = useState(null);
    const [proname, setProname] = useState("");
    const [proprice, setProprice] = useState("");
    const [procat, setProcat] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload12 = (e) => {
        e.preventDefault(); 
        const formData33 = new FormData();
        formData33.append('image', image);
        formData33.append('name', proname);
        formData33.append('price', proprice);
        formData33.append('categorie', procat);

        fetch('http://localhost:8000/api/images/', {
            method: 'POST',
            headers : {
                'X-CSRFToken': csrfToken,
            },
            body: formData33,
        })
        .then(response => response.json())
        .then(data => {
            console.log("Product uploaded successfully:", data);
        })
        .catch(error => {
            console.error("There was an error uploading the image!", error);
        });
        setProname('');
        setProcat('');
        setProprice('');
        setShowForm(false);
    };

    const handleCancel = () => {
        setProname('');
        setProcat('');
        setProprice('');
        setShowForm(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 2000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <>
            <ADMIN_NAVBAR />
            <div className="carousel">
                <div className="carousel-slides">
                    <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                </div>
            </div>

            {/* Fruit Section */}
            <h1 style={{ alignItems: 'center', color: 'green', marginTop: '50px' }}>FRESH FRUIT</h1>
            <div className="product-grid">
                {images1.map(image => (
                    <div key={image.id} className="product-item">
                        <div className="product-image">
                            <img src={`http://localhost:8000${image.image}`} alt="Product 1" />
                            <button className="buy-button">Buy Now</button>
                        </div>
                        <h3>{image.name} SEEDS</h3>
                        <p>{image.categorie}</p>
                        <div className="price1">₹ {image.price} per kg</div>
                    </div>
                ))}
            </div>

            <h1 style={{ alignItems: 'center', color: 'green', marginTop: '50px' }}>FRESH VEGETABLE</h1>
            <div className="product-grid">
                {images2.map(image => (
                    <div key={image.id} className="product-item">
                        <div className="product-image">
                            <img src={`http://localhost:8000${image.image}`} alt="Product 1" />
                            <button className="buy-button">Buy Now</button>
                        </div>
                        <h3>{image.name} SEEDS</h3>
                        <p>{image.categorie}</p>
                        <div className="price1">₹ {image.price} per kg</div>
                    </div>
                ))}
            </div>

            <h1 style={{ alignItems: 'center', color: 'green', marginTop: '50px' }}>FRESH GRAIN</h1>
            <div className="product-grid">
                {images3.map(image => (
                    <div key={image.id} className="product-item">
                        <div className="product-image">
                            <img src={`http://localhost:8000${image.image}`} alt="Product 1" />
                            <button className="buy-button">Buy Now</button>
                        </div>
                        <h3>{image.name} SEEDS</h3>
                        <p>{image.categorie}</p>
                        <div className="price1">₹ {image.price} per kg</div>
                    </div>
                ))}
            </div>

            <h1 style={{ alignItems: 'center', color: 'green', marginTop: '50px' }}>FRESH DRYFRUIT</h1>
            <div className="product-grid">
                {images4.map(image => (
                    <div key={image.id} className="product-item">
                        <div className="product-image">
                            <img src={`http://localhost:8000${image.image}`} alt="Product 1" />
                            <button className="buy-button">Buy Now</button>
                        </div>
                        <h3>{image.name} SEEDS</h3>
                        <p>{image.categorie}</p>
                        <div className="price1">₹ {image.price} per kg</div>
                    </div>
                ))}
            </div>

            {/* Add Product Form */}
            <div className="appointment-container">
                <button className="appointment-button" onClick={() => setShowForm(true)}>
                    Add Product
                </button>

                {showForm && (
                    <form className="appointment-form" onSubmit={handleUpload12}>
                        <h2>Add a product</h2>
                        <div className="form-group">
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="product_name"
                                value={proname}
                                onChange={(e) => setProname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="text"
                                name="price"
                                value={proprice}
                                onChange={(e) => setProprice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category:</label>
                            <input
                                type="text"
                                name="category"
                                value={procat}
                                onChange={(e) => setProcat(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Image:</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                            <button type="button" className="cancel-button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <FOOTER />
        </>
    );
}

export default UP_IMG;
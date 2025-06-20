import './product.css';
import NAVBAR from "./user/navbar";
import FOOTER from './user/footer';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import pc1 from './img/productbanner.jpg';
import pc2 from './img/productbanner1.jpg';

function PRODUCT() {
    const images = [pc2, pc1];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cartVisible, setCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [showBuyOptions, setShowBuyOptions] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({ name: '', address: '', pincode: '', cardNumber: '', cvv: '' });

    const goToNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const query = new URLSearchParams(useLocation().search);
    const username = query.get('username');
    const email = query.get('email');

    // Product fetching
    const [categoryImages, setCategoryImages] = useState({
        FRUIT: [], VEGETABLE: [], GRAIN: [], DRYFRUIT: []
    });

    useEffect(() => {
        const fetchImages = (category) => {
            const formData = new FormData();
            formData.append('categorie', category);
            fetch('http://localhost:8000/api/images/get/', { method: 'POST', headers : {'X-CSRFToken': csrfToken,} , body: formData })
                .then(response => response.json())
                .then(data => setCategoryImages(prev => ({ ...prev, [category]: data })))
                .catch(error => console.error(`Error fetching ${category} images:`, error));
        };

        fetchImages('FRUIT');
        fetchImages('VEGETABLE');
        fetchImages('GRAIN');
        fetchImages('DRYFRUIT');
    }, []);

    // Add item to cart
    const addToCart = (name, price, category) => {
        setCartItems(prevItems => [...prevItems, { name, price, category }]);
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => parseInt(total) + parseInt(item.price), 0);
    };

    // Clear the cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Submit form data to the backend
    const handleSubmit = (e) => {
        e.preventDefault();
        const total = calculateTotal();
        const data = {
            name: formData.name,
            address: formData.address,
            buy_method: paymentMethod,
            total_price: total,
            pincode: formData.pincode,
            card_number: paymentMethod === 'CARD' ? formData.cardNumber : null,
        };

        fetch('http://localhost:8000/api/buy/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','X-CSRFToken': csrfToken, },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Purchase successful", data);
                clearCart();
                setShowBuyOptions(false);
            })
            .catch(error => console.error("Error during purchase:", error));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const getCsrfToken = async () => {
            const response = await fetch('http://localhost:8000/api/get-csrf-token/', {
                method: 'GET',
                mode: 'cors',
            });
            const data = await response.json();
            setCsrfToken(data.csrfToken);
        };
        getCsrfToken();
    }, []);

    return (
        <>
            <NAVBAR />
            {/* Carousel */}
            <div className="carousel">
                <div className="carousel-slides">
                    <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                </div>
            </div>

            {/* Product Sections */}
            <h1 style={{ alignItems: 'center', color: 'green', marginTop: '50px' }}>FRESH FRUIT SEEDS</h1>
            <div className="product-grid">
                {categoryImages.FRUIT.map((image, index) => (
                    <div key={index} className="product-item">
                        <div className="product-image">
                            <img src={`http://localhost:8000${image.image}`} alt="Product" />
                            <button className="buy-button" onClick={() => addToCart(image.name, image.price, image.categorie)}>Buy Now</button>
                        </div>
                        <h3 style={{ marginTop: '20px' }}>{image.name} SEEDS</h3>
                        <div className="price1">₹ {image.price} per kg</div>
                    </div>
                ))}
            </div>

            <h1 style={{ alignItems: 'center', color: 'green', marginTop: '50px' }}>FRESH VEGETABLE SEEDS</h1>
            <div className="product-grid">
                {categoryImages.VEGETABLE.map((image, index) => (
                    <div key={index} className="product-item">
                        <div className="product-image">
                            <img src={`http://localhost:8000${image.image}`} alt="Product" />
                            <button className="buy-button" onClick={() => addToCart(image.name, image.price, image.categorie)}>Buy Now</button>
                        </div>
                        <h3 style={{ marginTop: '20px' }}>{image.name} SEEDS</h3>
                        <div className="price1">₹ {image.price} per kg</div>
                    </div>
                ))}
            </div>

            <h1 style={{ alignItems: 'center', color: 'green', marginTop: '50px' }}>FRESH GRAIN</h1>
            <div className="product-grid">
                {categoryImages.GRAIN.map((image, index) => (
                    <div key={index} className="product-item">
                        <div className="product-image">
                            <img src={`http://localhost:8000${image.image}`} alt="Product" />
                            <button className="buy-button" onClick={() => addToCart(image.name, image.price, image.categorie)}>Buy Now</button>
                        </div>
                        <h3 style={{ marginTop: '20px' }}>{image.name} SEEDS</h3>
                        <div className="price1">₹ {image.price} per kg</div>
                    </div>
                ))}
            </div>

            <h1 style={{ alignItems: 'center', color: 'green', marginTop: '50px' }}>FRESH DRYFRUIT SEEDS</h1>
            <div className="product-grid">
                {categoryImages.DRYFRUIT.map((image, index) => (
                    <div key={index} className="product-item">
                        <div className="product-image">
                            <img src={`http://localhost:8000${image.image}`} alt="Product" />
                            <button className="buy-button" onClick={() => addToCart(image.name, image.price, image.categorie)}>Buy Now</button>
                        </div>
                        <h3 style={{ marginTop: '20px' }}>{image.name} SEEDS</h3>
                        <div className="price1">₹ {image.price} per kg</div>
                    </div>
                ))}
            </div>

            {/* Cart Section */}
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <button onClick={() => setCartVisible(!cartVisible)} className="view-cart-button">
                    {cartVisible ? "Hide Cart" : "View Your Cart"}
                </button>
            </div>

            {/* Cart Table */}
            {cartVisible && (
                <div className="cart-section">
                    <h2>Your Cart</h2>
                    {cartItems.length > 0 ? (
                        <>
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name} SEEDS</td>
                                            <td>{item.price}</td>
                                            <td>{item.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>Total Bill: ₹ {calculateTotal()}</div>
                            <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            )}

            {/* Buy Now Section */}
            {cartItems.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button onClick={() => setShowBuyOptions(!showBuyOptions)} className="view-cart-button">
                        {showBuyOptions ? "Cancel Purchase" : "Buy Now"}
                    </button>
                </div>
            )}

            {/* Payment Options */}
            {showBuyOptions && (
                <div className="payment-options" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="COD"
                            onChange={() => setPaymentMethod('COD')}
                        />
                        Cash on Delivery
                    </label>
                    <label style={{ marginLeft: '20px' }}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="CARD"
                            onChange={() => setPaymentMethod('CARD')}
                        />
                        Pay by Card
                    </label>

                    {/* Form for COD */}
                    {paymentMethod === 'COD' && (
                        <form onSubmit={handleSubmit} className="payment-form">
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
                            <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
                            <button type="submit">Submit</button>
                        </form>
                    )}

                    {/* Form for Card Payment */}
                    {paymentMethod === 'CARD' && (
                        <form onSubmit={handleSubmit} className="payment-form">
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
                            <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
                            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} required />
                            <input type="text" name="cvv" placeholder="CVV" required />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
            )}

            <FOOTER />
        </>
    );
}

export default PRODUCT;

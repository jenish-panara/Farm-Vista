import NAVBAR from "./user/navbar";
import FOOTER from './user/footer';
import { useLocation } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import './appo.css';


function CROP_DI() {
    const query = new URLSearchParams(useLocation().search);
    const user_name = query.get('username');
    const email = query.get('email');

    const [showForm, setShowForm] = useState(false);
    const [image12, setImage12] = useState(null);
    const [cropData, setCropData] = useState(null);
    const [error, setError] = useState('');

    const handleImageChange12 = (e) => {
        setImage12(e.target.files[0]);
    };

    const [csrfToken, setCsrfToken] = useState('');

        useEffect(() => {
            const getCsrfToken = async () => {
              const response = await fetch('http://localhost:8000/api/get-csrf-token/');
              const data = await response.json();
              setCsrfToken(data.csrfToken);
            };
            getCsrfToken();
          }, []);

    const handleUpload123 = (e) => {
        e.preventDefault();

        if (!image12) {
            setError("Please select an image.");
            return;
        }

        const formData33 = new FormData();
        formData33.append('image', image12);

        fetch('http://localhost:8000/api/crop_disease/', {
            method: 'POST',
            headers : {
                'X-CSRFToken': csrfToken,
            },
            body: formData33,
        })
            .then(response => response.json())
            .then(data => {
                setCropData(data);
                setShowForm(false);
                setError(''); 
            })
            .catch(error => {
                console.error("There was an error uploading the image!", error);
                setError('There was an error uploading the image.');
            });
    };

    const handleCancel = () => {
        setShowForm(false);
        setCropData(null);
        setError('');
        setShowForm45(false)
    };

    const [formData, setFormData] = useState({
        state: '',
        previousCrop: '',
        month: ''
    });
    const [recommendations, setRecommendations] = useState(null);
    const [showForm45, setShowForm45] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setRecommendations(null);
    
        const response = await fetch('http://localhost:8000/api/get-ideal-crop/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(formData)
        });
    
        if (response.ok) {
            const data = await response.json();
            setRecommendations(data.recommendations);
        } else {
            console.error('Error fetching recommendations');
        }
    };    


    const closeTable = () => {
        setRecommendations(null);
    };

    const [cropInfoFormVisible, setCropInfoFormVisible] = useState(false); 
    const [cropName, setCropName] = useState('');
    const [cropInfo, setCropInfo] = useState(null);
    const [cropError, setCropError] = useState(''); 

    const handleCropInputChange = (e) => {
        setCropName(e.target.value);
    };

    const handleCropInfoSubmit = async (e) => {
        e.preventDefault();
        setCropError('');
        setCropInfo(null);

        try {
            const response = await fetch('http://localhost:8000/api/get-crop-info/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({ crop_name: cropName })
            });

            if (response.ok) {
                const data = await response.json();
                setCropInfo(data); 
            } else {
                console.error('Error fetching crop info');
                setCropError('Error fetching crop info from the API');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setCropError('There was an error fetching crop info.');
        }
    };

    const handleCancelCropInfo = () => {
        setCropInfoFormVisible(false);
        setCropName(''); 
        setCropInfo(null); 
        setCropError('');
    };

    const [showweather, showweatherfrom] = useState(false);
    const [place, setplace] = useState('');
    const [weatherdata, setweatherdata] = useState(null);
    const [weathererror,setweathererror] = useState('');

    const handleweathercancel = () =>{
        showweatherfrom(false);
        setplace('');
        setweatherdata(null);
    }

    const handleWeatherInputChange = (e) => {
        setplace(e.target.value);
    };

    const handle11 =async (e) =>{
        e.preventDefault();
        setweathererror('');
        setweatherdata(null);

        try {
            const response = await fetch('http://localhost:8000/api/get-weather-info/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({ city: place })
            });

            if (response.ok) {
                const data = await response.json();
                setweatherdata(data); 
            } else {
                console.error('Error fetching crop info');
                setweathererror('Error fetching crop info from the API');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setweathererror('There was an error fetching crop info.');
        }
    }

    


    return (
        <>
            <NAVBAR />
            <div className="appointment-container" style={{ marginTop: '150px' }}>
                <button className="appointment-button" onClick={() => setShowForm(true)}>
                    UPLOAD CROP PHOTO
                </button>

                {showForm && (
                    <form className="appointment-form" onSubmit={handleUpload123}>
                        <h2>CROP DISEASE</h2>
                        <div className="form-group">
                            <label>Image:</label>
                            <input
                                type="file"
                                onChange={handleImageChange12}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
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

                {cropData && (
                    <div className="crop-disease-table">
                        <h3>Crop Disease Analysis</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Disease</strong></td>
                                    <td>{cropData.name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Cause</strong></td>
                                    <td>{cropData.cause}</td>
                                </tr>
                                <tr>
                                    <td><strong>Cure</strong></td>
                                    <td>{cropData.cure}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                                Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="container123456">
                <button className="appointment-button" onClick={() => showweatherfrom(true)}>
                    CHECK weather forecast 
                </button>

                {showweather && (
                    <form className="appointment-form" onSubmit={handle11}>
                        <h2>WEATHER FORECAST</h2>
                        <div className="form-group">
                            <label>CITY:</label>
                            <input
                                type="text"
                                value={place}
                                onChange={handleWeatherInputChange}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <div className="button-group">
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                            <button type="button" className="cancel-button" onClick={handleweathercancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {weatherdata && (
                    <div>
                        <h3>Weather Information</h3>
                        <table className="table1234">
                            <tbody>
                                <tr>
                                    <td className="td1234"><strong>Today's temperature</strong></td>
                                    <td className="td1234">{weatherdata.avg_temp}</td>
                                </tr>
                                <tr>
                                    <td className="td1234"><strong>Wind Condition</strong></td>
                                    <td className="td1234">{weatherdata.wind_condition}</td>
                                </tr>
                                <tr>
                                    <td className="td1234"><strong>Today's Humidity</strong></td>
                                    <td className="td1234">{weatherdata.humidity}</td>
                                </tr>
                                <tr>
                                    <td className="td1234"><strong>Weather Prediction</strong></td>
                                    <td className="td1234">{weatherdata.weather_prediction}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={handleweathercancel} className="cancel-button" >Close</button>
                    </div>
                )}

                {weathererror && <p>{weathererror}</p>}

            </div>

            <div className="container123456">
                <button className="button1234" onClick={() => setShowForm45(!showForm45)}>Ideal Crop</button>

                {showForm45 && (
                    <form className="form1234" onSubmit={handleSubmit}>
                        <label className="label1234">
                            State:
                            <input className="input1234" type="text" name="state" value={formData.state} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <label className="label1234">
                            Previous Crop:
                            <input className="input1234" type="text" name="previousCrop" value={formData.previousCrop} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <label className="label1234">
                            Month:
                            <input className="input1234" type="text" name="month" value={formData.month} onChange={handleInputChange} required />
                        </label>
                        <br />
                        <button className="button1234" type="submit">Submit</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                                Cancel
                        </button>
                    </form>
                )}

                {recommendations && (
                    <div>
                        <table className="table1234">
                            <thead>
                                <tr>
                                    <th className="th1234">Crop</th>
                                    <th className="th1234">Reason</th>
                                    <th className="th1234">Soil Preparation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recommendations.map((rec, index) => (
                                    <tr key={index}>
                                        <td className="td1234">{rec.recommended_crop}</td>
                                        <td className="td1234">{rec.reason}</td>
                                        <td className="td1234">{rec.soil_preparation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={closeTable} className="cancel-button" >Close</button>
                    </div>
                )}
            </div>
            <div className="container123456">
                <button className="button1234" onClick={() => setCropInfoFormVisible(!cropInfoFormVisible)} style={{marginTop:'20px'}}>Get Info About Crop</button>

                {cropInfoFormVisible && (
                    <form onSubmit={handleCropInfoSubmit} className="form1234" >
                        <label className="label1234">
                            Enter Crop Name:
                            <input type="text" className="input1234" value={cropName} onChange={handleCropInputChange} required />
                        </label>
                        <br />
                        <button type="submit" className="button1234">Submit</button>
                        <button type="button" onClick={handleCancelCropInfo} className="cancel-button" >Close</button>
                    </form>
                )}

                {cropInfo && (
                    <div>
                        <h3>Crop Information</h3>
                        <table className="table1234">
                            <tbody>
                                <tr>
                                    <td className="td1234"><strong>Nourishment</strong></td>
                                    <td className="td1234">{cropInfo.nourishment}</td>
                                </tr>
                                <tr>
                                    <td className="td1234"><strong>Soil Condition</strong></td>
                                    <td className="td1234">{cropInfo.soil_condition}</td>
                                </tr>
                                <tr>
                                    <td className="td1234"><strong>Best Time to Grow</strong></td>
                                    <td className="td1234">{cropInfo.best_time}</td>
                                </tr>
                                <tr>
                                    <td className="td1234"><strong>Production Improvement Tips</strong></td>
                                    <td className="td1234">{cropInfo.production_tips}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={handleCancelCropInfo} className="cancel-button" >Close</button>
                    </div>
                )}

                {cropError && <p>{cropError}</p>}
            </div>
            <FOOTER />
        </>
    );
}

export default CROP_DI;
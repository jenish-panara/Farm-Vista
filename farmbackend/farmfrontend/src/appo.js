import NAVBAR from "./user/navbar";
import FOOTER from './user/footer';
import './appo.css';
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import apo1 from './img/appo1.jpg';
import apo2 from './img/appo2.jpg';
import apo3 from './img/appo3.jpg';
import apo4 from './img/appo4.jpg';

function APPO() {
    const query = new URLSearchParams(useLocation().search);
    const username = query.get('username');
    const email = query.get('email');

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        admin_name: '',
        user_name: username,
        date: '',
        address: ''
    });

    const [csrfToken, setCsrfToken] = useState('');
    const [appointments, setBookedAppo] = useState([]);
    const [showAppointments, setShowAppointments] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    // Fetch CSRF Token
    useEffect(() => {
        const getCsrfToken = async () => {
            const response = await fetch('http://localhost:8000/api/get-csrf-token/');
            const data = await response.json();
            setCsrfToken(data.csrfToken);
        };
        getCsrfToken();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle appointment form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/book_appo/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
        setShowForm(false);
        setFormData({
            admin_name: '',
            user_name: username,
            date: '',
            address: ''
        });
    };

    // Show appointments
    const handleShowAppointments = () => {
        const formData = new FormData();
        formData.append('user_name', username);
        fetch('http://localhost:8000/api/show_appo/', { method: 'POST',headers : { 'X-CSRFToken': csrfToken, }, body: formData })
            .then(response => response.json())
            .then(data => setBookedAppo(data))
            .catch(error => console.error('Error fetching appointments:', error));
        setShowAppointments(true);
    };

    // Show appointment details
    const handleShowResult = (appo_user, appo_admin, appo_date) => {
        fetch(`http://localhost:8000/api/appointment_details/${appo_user}/${appo_admin}/${appo_date}/`,
            {
                headers : {
                    'X-CSRFToken': csrfToken,
                }
            }
        )
            .then(response => response.json())
            .then(data => setAppointmentDetails(data))
            .catch(error => console.error('Error fetching appointment details:', error));
    };

    // Delete appointment
    const handleDeleteAppointment = (user_name, admin_name, date) => {
        fetch(`http://localhost:8000/api/delete_appo/${user_name}/${admin_name}/${date}/`, {
            method: 'DELETE',
            headers : {
                'X-CSRFToken': csrfToken,
            }
        })
            .then(response => {
                if (response.ok) {
                    setBookedAppo(appointments.filter(app => app.date !== date || app.admin_name !== admin_name));
                }
            })
            .catch(error => console.error('Error deleting appointment:', error));
    };

    // Cancel form and result view
    const handleCancel = () => {
        setShowForm(false);
        setShowAppointments(false);
        setAppointmentDetails(null);
        setFormData({
            admin_name: '',
            user_name: username,
            date: '',
            address: ''
        });
    };

    return (
        <>
            <NAVBAR />
            <h1 style={{ marginTop: '180px' }}>OUR LAND SPECIALIST</h1>
            <div className="card-section11">
                <div className="card11">
                    <img src={apo1} alt='/' className="card-img11" />
                    <div className="card-body11">
                        <div className="card-date11">Dr. MUKESH SOJITRA</div>
                        <h3 className="card-title11">Soil Specialist</h3>
                        <p className="card-description11">15 years of experience in soil research</p>
                    </div>
                </div>

                <div className="card11">
                    <img src={apo2} alt='/' className="card-img11" />
                    <div className="card-body11">
                        <div className="card-date11">Dr. N K PANARA</div>
                        <h3 className="card-title11">Soil Specialist</h3>
                        <p className="card-description11">Soil professor at Chaudhary Charan Singh Haryana Agricultural University</p>
                    </div>
                </div>

                <div className="card11">
                    <img src={apo3} alt='/' className="card-img11" />
                    <div className="card-body11">
                        <div className="card-date11">Dr. VASANT THAKKAR</div>
                        <h3 className="card-title11">Crops Specialist</h3>
                        <p className="card-description11">2-time ICAR award winner</p>
                    </div>
                </div>

                <div className="card11">
                    <img src={apo4} alt='/' className="card-img11" />
                    <div className="card-body11">
                        <div className="card-date11">Dr. GHANSHYAM TEJANI</div>
                        <h3 className="card-title11">Crops Disease Specialist</h3>
                        <p className="card-description11">Nominee for Nobel award in crop disease</p>
                    </div>
                </div>
            </div>

            <div className="appointment-container">
                <button className="appointment-button" onClick={() => setShowForm(true)}>
                    Book Appointment
                </button>

                {showForm && (
                    <form onSubmit={handleSubmit} className="appointment-form">
                        <h2>Book an Appointment</h2>
                        <div className="form-group">
                            <label>Admin Name:</label>
                            <input
                                type="text"
                                name="admin_name"
                                value={formData.admin_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="submit-button">Submit</button>
                            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>

            <div className="appointment-container" style={{ marginTop: '100px' }}>
                <div className="form-container">
                    <button className="appointment-button" onClick={handleShowAppointments}>
                        Show My Appointment
                    </button>
                    {showAppointments && (
                        <div className="appointments-list">
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <div key={appointment.date + appointment.admin_name} className="appointment-card">
                                        <h3>Booked Appointment</h3>
                                        <p><strong>Admin Name:</strong> {appointment.admin_name}</p>
                                        <p><strong>Date:</strong> {appointment.date}</p>
                                        <p><strong>Address:</strong> {appointment.address}</p>

                                        <button className="result-button" onClick={() => handleShowResult(username, appointment.admin_name, appointment.date)}>
                                            Show Result
                                        </button>

                                        <button className="cancel-button" onClick={() => handleDeleteAppointment(username, appointment.admin_name, appointment.date)}>
                                            Cancel Appointment
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No appointments found.</p>
                            )}
                            <div className="button-group">
                                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    )}

                    {appointmentDetails && (
                        <div className="appointment-card">
                            <h3>Appointment Result</h3>
                            <p><strong>Specialist:</strong> {appointmentDetails.admin_name}</p>
                            <p><strong>Date:</strong> {appointmentDetails.appointment_date}</p>
                            <p><strong>Soil Condition:</strong> {appointmentDetails.soil_condition}</p>
                            <p><strong>Soil Fertility:</strong> {appointmentDetails.soil_fertility}</p>
                            <p><strong>Recommended Crop:</strong> {appointmentDetails.recommended_crop}</p>
                            <p><strong>Nutrients Needed:</strong> {appointmentDetails.nutrients_needed}</p>
                            <p><strong>Other Suggestions:</strong>  {appointmentDetails.other_suggestions}</p>
                            <div className="button-group">
                                <button type="button" className="cancel-button" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FOOTER />
        </>
    );
}

export default APPO;

import ADMIN_NAVBAR from "./adminnavbar"
import FOOTER from "../user/footer"
import React, { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import '../appo.css'
function ADMIN_APPO(){

    const query = new URLSearchParams(useLocation().search);
    const admin_name = query.get('username');
    const email = query.get('email');

    const [csrfToken, setCsrfToken] = useState('');

        useEffect(() => {
            const getCsrfToken = async () => {
              const response = await fetch('http://localhost:8000/api/get-csrf-token/');
              const data = await response.json();
              setCsrfToken(data.csrfToken);
            };
            getCsrfToken();
          }, []);
      
        const [appointments, setbookedappo] = useState([]);
        const [showAppointments, setbookedForm] = useState(false);
        const handleappo = () => {
            const formData1 = new FormData();
            formData1.append('admin_name',admin_name)
            fetch('http://localhost:8000/admin/show_appo/',{method:'POST',headers:{'X-CSRFToken': csrfToken,} ,body:formData1,})
                .then(response => response.json())
                .then(data => setbookedappo(data))
                .catch(error => console.error('Error fetching images:', error)); 
            setbookedForm(true)    
        };

        const [selectedAppointment, setSelectedAppointment] = useState(null);
        const [formData, setFormData] = useState({
            admin:admin_name || "",
            Water_Percentage : "",
            Air_Percentage : '',
            sand: '',
            silt: '',
            clay: '',
            Organic_Matter_Percentage: '',
            pH : '',
            Nitrogen_Content : '',
            Phosphorus_Content : '',
            Potassium_Content : '',
        });

        const handleInsertData = (appointment) => {
            setSelectedAppointment(appointment);
            setFormData((prevData) => ({
                ...appointment,
                admin: admin_name,
            }));
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
            ...prevData,
            [name]: value
            }));
        };

        const [insert_data,setidata] = useState([])
        const handleSubmit = (e) => {
            e.preventDefault();
            
            console.log('Form submitted:', formData);
        
            fetch('http://localhost:8000/admin/insert_data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setidata(data);
                console.log('Response:', data);
            })
            .catch(error => console.error('Error during submission:', error));
            setFormData({
                admin:admin_name || "",
                Water_Percentage : "",
                Air_Percentage : '',
                sand: '',
                silt: '',
                clay: '',
                Organic_Matter_Percentage: '',
                pH : '',
                Nitrogen_Content : '',
                Phosphorus_Content : '',
                Potassium_Content : '',
            });
        };

        const handleCancel = () => {
            setSelectedAppointment(null);
            setFormData({
                admin:admin_name || "",
                Water_Percentage : "",
                Air_Percentage : '',
                sand: '',
                silt: '',
                clay: '',
                Organic_Matter_Percentage: '',
                pH : '',
                Nitrogen_Content : '',
                Phosphorus_Content : '',
                Potassium_Content : '',
            });
        };

        const handleCancel1 = () => {
            setbookedForm(false);
        };


    return(
        <>
            <ADMIN_NAVBAR/>

            <div className="appointment-container" style={{ marginTop: '200px' }}>
                <div className="form-container">
                    <button className="appointment-button" onClick={handleappo}>
                        Show My Appointment
                    </button>
                    {showAppointments && (
                        <div className="appointments-list">
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <div key={appointment.id} className="appointment-card">
                                        <h3>Booked Appointment</h3>
                                        <p><strong>User Name:</strong> {appointment.user_name}</p>
                                        <p><strong>Date:</strong> {appointment.date}</p>
                                        <p><strong>Address:</strong> {appointment.address}</p>

                                        <button className="result-button" onClick={() => handleInsertData(appointment)}>insert data</button>
                                    </div>
                                ))
                            ) : (
                                <p>No appointments found.</p>
                            )}
                            <div className="button-group">
                                <button type="button" className="cancel-button" onClick={handleCancel1}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {selectedAppointment && (
                    <div className="appointment-form-container" style={{marginTop:'50px'}}>
                    <form onSubmit={handleSubmit}>
                        <h2>INSERT DATA {admin_name}</h2>
                        <div className="form-group" style={{marginTop:'40px'}}>
                        <table className="insert-data-table">
                            <tbody>
                                <tr>
                                    <td><label>Water Percentage (%):</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Water_Percentage"
                                            value={formData.Water_Percentage}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Air Percentage (%):</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Air_Percentage"
                                            value={formData.Air_Percentage}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Mineral Particles (%) (sand):</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="sand"
                                            value={formData.sand}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Mineral Particles (%) (silt):</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="silt"
                                            value={formData.silt}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Mineral Particles (%) (clay):</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="clay"
                                            value={formData.clay}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Organic Matter Percentage (%):</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Organic_Matter_Percentage"
                                            value={formData.Organic_Matter_Percentage}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>pH Level of Soil:</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="pH"
                                            value={formData.pH}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Nitrogen Content (%):</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Nitrogen_Content"
                                            value={formData.Nitrogen_Content}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Potassium Content (%):</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Potassium_Content"
                                            value={formData.Potassium_Content}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Phosphorus Content (%):</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Phosphorus_Content"
                                            value={formData.Phosphorus_Content}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="submit-button">Submit</button>
                            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                    </div>
                )}
                </div>

            <FOOTER/>
        </>
    )
}
export default ADMIN_APPO
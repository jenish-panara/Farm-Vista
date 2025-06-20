import "../user/navbar.css"
import logo from '../img/logo.jpeg';
import { useLocation,useNavigate } from 'react-router-dom';


function ADMIN_NAVBAR(){
    const navigate=useNavigate()
    const query = new URLSearchParams(useLocation().search);
    const username = query.get('username');
    const email = query.get('email');
    return(
        <>
            <nav className="navbar">
                <div className="brand-title">
                    <img src={logo} alt="Brand Logo"/>
                </div>
                <input type="checkbox" id="menu-toggle"/>
                <label htmlFor="menu-toggle" className="menu-icon">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </label>
                <div className="navbar-links">
                    <ul>
                        <li><a href="" onClick={()=>{navigate(`/admin/home?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>Home</a></li>
                        <li><a href="" onClick={()=>{navigate(`/admin/product?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>Product</a></li>
                        <li><a href="" onClick={()=>{navigate(`/admin/appointment?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>Book App.</a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default ADMIN_NAVBAR
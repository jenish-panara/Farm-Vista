import "../user/signup.css"
import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import logo from '../img/logo.jpeg'
import { createContext } from "react"

function SIGNUP1(){

    const navigate = useNavigate()
    const [infoname,setinfoname]=useState('')
    const [infoemail,setinfoemail]=useState('')
    const [infopassword,setinfopassword]=useState('')
    const name = createContext();
    const email = createContext();

    const info={
        name:infoname,
        email:infoemail,
        password:infopassword,
    }

      const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/admin/signup/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
              },
              body: JSON.stringify(info),
            });
            const data = await response.json();
            if(data.name===info.name){
                navigate(`/admin/home?username=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}`);
            }
            } 
            catch (error) {
                console.error('Error:', error);
            }
        }

        const [csrfToken, setCsrfToken] = useState('');

        useEffect(() => {
            const getCsrfToken = async () => {
              const response = await fetch('http://localhost:8000/api/get-csrf-token/');
              const data = await response.json();
              setCsrfToken(data.csrfToken);
            };
            getCsrfToken();
          }, []);


    return(
        <div className="n1">
                <div className="auth-container">
                    <div className="welcome-section">
                        <img src={logo} style={{borderRadius:'50%',width:'150px',height:'150px'}}></img>
                        <h1 style={{margin:'20px'}}>Welcome to Vanspati</h1>
                        <p className="p1">Empowering Farmers, Enriching Lives</p>
                        <button onClick={()=>{navigate('/admin/login')}} className="button1" >Sign In</button>
                    </div>
                    <div className="signup-section">
                        <h2>Sign Up</h2>
                        <form onSubmit={handlesubmit} className="form1">
                            <label htmlFor="username" className="label1">Admin name</label>
                            <input type="text" id="username" className="input1" name="username" placeholder="Enter your admin name" onChange={(e)=>{setinfoname(e.target.value)}} required/>

                            <label htmlFor="email" className="label1">Email</label>
                            <input type="email" id="email" className="input1" name="email" placeholder="Enter your email" onChange={(e)=>{setinfoemail(e.target.value)}}  required/>

                            <label htmlFor="password" className="label1">Password</label>
                            <input type="password" id="password" className="input1" name="password" placeholder="Enter your password" onChange={(e)=>{setinfopassword(e.target.value)}}  required/>
                            
                            <button type="submit" className="button1">Sign Up</button>
                        </form>
                        <p className="p1">Already have an account? <a href="/admin/login" className="a1">Sign In</a></p>
                    </div>
                </div>
        </div>
    )
}

export default SIGNUP1
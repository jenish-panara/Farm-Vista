import "./signup.css"
import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import logo from '../img/logo.jpeg'

function SIGNUP(){

    const navigate = useNavigate()
    const [infoname,setinfoname]=useState('')
    const [infoemail,setinfoemail]=useState('')
    const [infopassword,setinfopassword]=useState('')
    const [infonumber,setinfonumber]=useState('')

    const info={
        name:infoname,
        email:infoemail,
        password:infopassword,
        number:infonumber
    }

      const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/signup/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
              },
              body: JSON.stringify(info),
            });
            const data = await response.json();
            if(data.name===info.name){
                navigate(`/home?username=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}`);
            }
            } 
            catch (error) {
                console.error('Error:', error);
            }
        }

        const [csrfToken, setCsrfToken] = useState('');

        useEffect(() => {
            const getCsrfToken = async () => {
              const response = await fetch('http://localhost:8000/api/get-csrf-token/',{
                method:'GET',
                mode: 'cors',
              });
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
                        <button onClick={()=>{navigate('/')}} className="button1" >Sign In</button>
                    </div>
                    <div className="signup-section">
                        <h2>Sign Up</h2>
                        <form onSubmit={handlesubmit} className="form1">
                            <label for="username" className="label1">Username</label>
                            <input type="text" id="username" className="input1" name="username" placeholder="Enter your username" onChange={(e)=>{setinfoname(e.target.value)}} required/>

                            <label for="contact" className="label1">Contact Number</label>
                            <input type="text" id="contact" className="input1" name="contact" placeholder="Enter your contact number" onChange={(e)=>{setinfonumber(e.target.value)}} required/>

                            <label for="email" className="label1">Email</label>
                            <input type="email" id="email" className="input1" name="email" placeholder="Enter your email" onChange={(e)=>{setinfoemail(e.target.value)}}  required/>

                            <label for="password" className="label1">Password</label>
                            <input type="password" id="password" className="input1" name="password" placeholder="Enter your password" onChange={(e)=>{setinfopassword(e.target.value)}}  required/>
                            
                            <button type="submit" className="button1">Sign Up</button>
                        </form>
                        <p className="p1">Already have an account? <a href="/" className="a1">Sign In</a></p>
                    </div>
                </div>
        </div>
    )
}

export default SIGNUP
import './signup.css'
import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import logo from '../img/logo.jpeg'


function LOGIN(){

    const navigate=useNavigate()
    const [infoemail,setinfoemail]=useState('')
    const [infopassword,setinfopassword]=useState('')

    const info={
        email:infoemail,
        password:infopassword
    }

      const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
              },
              body: JSON.stringify(info),
            });
            const data = await response.json();
            const data1 = JSON.parse(data);
            const u1=data1[0];
            if (u1.fields.email===info.email){
                // navigate('/home')
                navigate(`/home?username=${encodeURIComponent(u1.fields.name)}&email=${encodeURIComponent(u1.fields.email)}`);
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
        <>
        <div classNameName="ni">
            <div className="auth-container" >
                <div className="welcome-section">
                    <img src={logo} style={{borderRadius:'50%',width:'150px',height:'150px'}}></img>
                    <h1 style={{margin:'20px'}}>Welcome to Vanspati</h1>
                    <p className='p1'>Empowering Farmers, Enriching Lives</p>
                    <button onClick={() =>{navigate('/signup')}} className='button1'>Sign Up</button>
                </div>
                <div className="login-section">
                    <h2>Sign In</h2>
                    <form onSubmit={handlesubmit} className='form1'>
                        <label for="Email" className='label1'>Email</label>
                        <input type="email" className='input1' placeholder="Enter your email" onChange={(e)=>{setinfoemail(e.target.value)}} required/>
                        
                        <label for="password" className='label1'>Password</label>
                        <input type="password" className='input1' id="password" name="password" placeholder="Enter your password" onChange={(e)=>{setinfopassword(e.target.value)}} required/>
                        
                        <button type="submit" className='button1'>Sign In</button>
                    </form>
                    <p className='p1'>Don't have an account? <a className='a1' href="/signup">Sign Up</a></p>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default LOGIN
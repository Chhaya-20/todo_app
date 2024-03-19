import React, { useState } from 'react';
import './login.css';
import { useNavigate , Link } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch('https://todobackend-1-osqq.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Wrong Credentials")
        return;
      }

      const data = await response.json();
    //  console.log(data.token);
      localStorage.setItem('token',data.token)
      navigate('/');
      //console.log('Login successful:', data);
    } catch (error) {
      console.error("Internal Server Error");
    }
  };

  return (
    <div className="containers">
      <div className="form-box">
        <h1 id="titles" className='my-3'>LOGIN TO ACCOUNT</h1>
        <form  method='POST'>
  <div className="mb-3">
    
    <input name='email' className="form" type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />   
  </div>
  <div className="mb-3">
    
    <input onChange={(e) => { setPassword(e.target.value) }} name='password' className="form" type="password" placeholder="Password" />
  </div>
 
  <button  id="btn" onClick={login} type="submit" className="btn btn-primary my-3">Log in</button>
</form>
      
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
}

export default Login;

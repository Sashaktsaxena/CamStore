import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './nav';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const data={
    emailID:email,
    pass:password,
    
  }
  const handleLogin = async() => {
    // Implement your registration logic here
    // Example: Send a request to your server to create a new user account
    try{
        const response= await axios.post('/api/user/login',data)
        if(response.status==200){
            console.log("success")
        }else{
            console.error("register first ")
        }
    }catch(error){
        console.error(error);
    }
  };

  return (
    <section>
    <Navbar />
      <div className="left-sec">
    
    </div>
    <div className='right-sec'>
    <div className='loginform'>
    <div><p>Login Form</p></div>
    <div>
    <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        
      />
      </div>
      <div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       
      />
      </div>
      
      <div><button onClick={handleLogin}>Login</button></div>
      </div>
      </div>
    
    </section>
  );
};

export default Login;
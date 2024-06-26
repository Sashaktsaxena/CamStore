import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './nav';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [name, setname] = useState('');
  const data={
    emailID:email,
    pass:password,
    name:name
  }
  const handleRegister = async() => {
    // Implement your registration logic here
    // Example: Send a request to your server to create a new user account
    try{
        const response= await axios.post('/api/user/register',data)
        if(response.status==200){
            console.log("database succesfully updated")
        }else{
            console.error("request failed")
        }
    }catch(error){
        console.error(error);
    }
  };

  return (
    <div className="register-form">
    <Navbar />
        <input
        type="text"
        placeholder="Fullname"
        value={name}
        
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;

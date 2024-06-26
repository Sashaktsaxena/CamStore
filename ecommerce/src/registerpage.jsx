import React from "react"
import ReactDOM from 'react-dom/client';
import Register from "./register";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
function Registration(){
    return (
        <Router>
        
        <Routes>
      <Route path="/register" element={<Register />} />
      </Routes>
      </Router>
    )
}
export default Registration;
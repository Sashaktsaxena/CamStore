import React,{useState } from "react"
import ReactDOM from 'react-dom/client';
import Navbar from "./nav";
import Brand from "./Brand";

import axios from "axios"
import Products from "./products";
import ProductSec from "./productsec";
import Footer from "./footer";
import Card from "./cards";
import CardContainer from "./mcard";
function App(){
  const [underlinestyle,setunderlinestyle]=useState({
    width:0,
    left:0
  })
  const handlehover=(e)=>{
    const {offsetWidth:width,offsetLeft:left}=e.target;
    setunderlinestyle({width,left})
  }
  const nothover=()=>{
    setunderlinestyle({width:0,left:0})
  }
  const [responseMessage, setResponseMessage] = useState('');

  const handleButtonClick = async () => {
    console.log("button clicked")
    try {
      const response = await axios.get('http://localhost:3001/sell'); // Use Axios to send a GET request
      if (response.status === 200) {
        window.location.href = "http://localhost:3001/sell";
      } else {
        console.error('Request failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const handleButtonClick = () => {
  //   console.log("Button clicked");
  //   window.location.href = 'http://localhost:3001/sell';
  // };
    return (     
    <div>

    <Navbar />
    <div className="heading">
    <div className="desc">
    {/* <div className="horizontal-line"></div>
    <div className="vertical-line"></div> */}
      <h1 className="ename" onMouseOver={handlehover} onMouseOut={nothover} style={{ cursor: 'pointer' }}>
        CLICKS
      </h1>
      <div className="underline" style={{ ...underlinestyle }}></div>
      <p className="para">
        A ecommerce platform who wants to capture events and memories. We ensure Quality captures
      </p>
      
      <div className="buttons">
        <button className="shop">SHOP NOW</button>

        <button className="sell" onClick={handleButtonClick}>SELL ITEM</button>

        
      </div>

    </div>
    <div><img className="headimg" src="./images/banner3.png"/></div>
    
  </div>
  <Brand />
  
  {/* <Card/> */}
  <ProductSec />
  <Footer />
  </div>
    )
    
}
export default App;

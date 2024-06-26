import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
function ProductSec(){
    const [info,setprod]=useState([]);
    const [underlinestylepr,setunderlinestylepr]=useState({
        width:0,
        left:0
      })
      const handlehoverndpr=(e)=>{
        const {offsetWidth:width,offsetLeft:left}=e.target;
        setunderlinestylepr({width:175,left})
      }
      const nothoverbr=()=>{
        setunderlinestylepr({width:0,left:0})
      }
    useEffect(() => {
        axios.get(`http://localhost:3001/getproducts`)

            .then(res => setprod(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <section id='pro'>
            <div className='s'>
            <h2 onMouseOver={handlehoverndpr}  style={{ cursor: 'pointer' }}>Popular Products </h2>
            <div className='linepr' style={{...underlinestylepr}}></div>
                <div className='p'>
                
                    {info.map((product) => (
                        <Link to={ `/product/${product._id}`}key={product._id}>
                        <div className="it">
                                    <img className="brand1" src={`../images/${product.img}`} alt={product.name} />
                                    
                                </div>
                                <div className="caminfo"><p>{product.brand} {product.name}</p></div>
                                <div className="price"><p>${product.price}</p></div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default ProductSec;
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import "./styles.css"
import Navbar from './nav';
function Products() {
    const {branding}=useParams()
    const [info, setdata] = useState([]);

    
    useEffect(() => {
        axios.get(`http://localhost:3001/getproducts/${branding}`)

            .then(res => setdata(res.data))
            .catch(err => console.log(err));
    }, [branding]);
   
        return (
            <section id='pro'>
            <Navbar/>
                <div className='s'>
                    <div className='p'>
                    <h2 >
                    Popular Products
                    </h2>
                    
                        { info.map((product) => (
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

    
export default Products;
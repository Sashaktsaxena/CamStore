import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./styles.css"

function Brand() {
    const [info, setdata] = useState([]);
    const [underlinestylebr,setunderlinestylebr]=useState({
        width:0,
        left:0
      })
      const handlehoverndbr=(e)=>{
        const {offsetWidth:width,offsetLeft:left}=e.target;
        setunderlinestylebr({width:70,left})
      }
      const nothoverbr=()=>{
        setunderlinestylebr({width:0,left:0})
      }
    useEffect(() => {
        axios.get('http://localhost:3001/getbrands')
            .then(res => setdata(res.data))
            .catch(err => console.log(err));
    }, );

    return (
        <section id='brand'>
            <div className='shopbrand'>
            <h2 onMouseOver={handlehoverndbr} style={{ cursor: 'pointer' }}>
            Brands
            </h2>
            <div className='line'style={{...underlinestylebr}}></div>
            
                <div className='brand'>
                    {info.data && info.data.map((product) => (
                        <Link to={ `/brand/${product.brands}`}key={product._id}>
                            <div className="camera">
                                <img className="brandy" src={`./images/${product.image}`} alt={product.name} />
                                <div className='des'><h4 className='nam'>{product.brands.toUpperCase()}</h4></div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Brand;


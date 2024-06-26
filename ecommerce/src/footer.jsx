import React from 'react';

import "./styles.css"
function Footer(){
    return (
    <section id="foot">
    <div className='elements'>
        <div className='rights'>
            <h5>About</h5>
        
                <p className='description'>This is a camera selling ecommerce website made as prototype</p>
           

        </div>
        <div className='middle'>
        <h5>contact</h5>
        <ul>
            <li>email:camstore@gmail.com</li>
            <li>+9164357845</li>
            <li>address:complex center,ernakulam,kochi ,kerela 682022</li>
        </ul>
        </div>
        <div className='middleleft'>
        <h5>Brands</h5>
        <ul>
            <li>Canon</li>
            <li>Nikon</li>
            <li>Fujifilm</li>
            <li>Sony</li>
        </ul>
        </div>
        <div className='leftside'>
        <h5>Ecommerce</h5>
        <ul>
            <li>Search</li>
            <li>Api</li>
            <li>authentication</li>
            <li>cart</li>
        </ul>
        </div>
    </div>
    </section>
    )
}
export default Footer;
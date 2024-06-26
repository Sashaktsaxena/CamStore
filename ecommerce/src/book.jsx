

import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './styles.css';
import { Link, unstable_useViewTransitionState } from 'react-router-dom';

function Book() {
  const [cartItems, setCartItems] = useState([]);
  

  useEffect(() => {
    // Fetch cart items from the server
    axios.get('http://localhost:3001/getCartItems')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);
  const  increaseQuantity=(id)=>{
    axios.patch((`http://localhost:3001/updateCartItem/${id}`),{increaseBy:1})
    .then(response=>{
      console.log("update success");
      axios.get('http://localhost:3001/getCartItems')
      .then(response=>{
        setCartItems(response.data);
      })
      .catch(error=>{
        console.error("error fetching data",error);
      })
    })
    .catch(error=>{
      console.error("error updating value");
    })
   }
   const deleteItem=(id)=>{
    axios.delete(`http://localhost:3001/deleteCartItem/${id}`)
    .then(response=>{
      console.log("deleted....");
    })
    axios.get('http://localhost:3001/getCartItems')
    .then(response=>{
      setCartItems(response.data);
    })
    .catch(error=>{
      console.log("error fetching data");
    })
    .catch(error=>{
      console.log("error deleting data")
    }
    )
   }
   

   return (
    <div id='cartbox' className="buy" style={{ overflow: 'auto', maxHeight: '2000px' }}>
      {cartItems.length === 0 ? (
        <p>No item in the cart</p>
      ) : (
        cartItems.map(item => (
          <div key={item._id} className='cart-item'>
            {/* Display cart item details */}
            <p>{item.names}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${item.price * item.quantity}</p>
  
            <button onClick={() => { increaseQuantity(item._id) }}>+</button>
            <button onClick={() => { deleteItem(item._id) }}>delete</button>
  
            <div className="cartg"><img className="cartimg" src={`../images/${item.images}`} alt={item.names} /></div>
            <div>            <label>
        <input type='checkbox' />:UPI on delivery
      </label>
  
      <button>Place order</button></div>

          </div>
          
        ))
        
      )}
  

    </div>
  );
        }  

export default Book;
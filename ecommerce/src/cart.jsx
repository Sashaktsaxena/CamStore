// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { FaTimes } from "react-icons/fa";
// import "./styles.css"
// import ProductDet from './ProductDet';
// function Cart({isOpen,closecart}){
//     return(
//     <div className={`cart ${isOpen ? 'open' : ''}`}>
//         <p>no products in the cart</p>
        
//         		<button
					
// 					onClick={closecart}>
// 					<FaTimes />
// 				</button>
//     </div>
//     )
// }



import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './styles.css';
import { Link } from 'react-router-dom';
function Cart({ isOpen, closeCart }) {
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
  }, [isOpen]);
   const  increaseQuantity=(id)=>{
    axios.patch(`http://localhost:3001/updateCartItems/${id}`,{increaseBy:1})
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

  return (
    <div id='cartbox' className={`cart ${isOpen ? 'open' : ''}`} style={{overflow:'auto',maxHeight:'2000px'}}>
      {cartItems.length === 0 ? (
        <p>No products in the cart</p>
      ) : (
        <div className='cartinfo'>
          {/* <h2>Shopping Cart</h2> */}
          {cartItems.map(item => (
            <div key={item._id} className='cart-item'>
              {/* Display cart item details */}
              <p>{item.names}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.price * item.quantity}</p>
              
              <button onClick={()=>increaseQuantity(item._id)}>+</button>
              
              <div className="cartg"><img className="cartimg" src={`../images/${item.images}`} alt={item.names} /></div>

              
            </div>
          ))}
        </div>
      )}
      <Link to={'/buy'}><button>Buy now</button></Link>
      <button onClick={closeCart}>
        <FaTimes />
      </button>
    </div>
  );
}

export default Cart;

// export default Cart;
// Cart.js
// Cart.js
// import React, { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';
// import './styles.css';

// function Cart({ isOpen, closeCart, addToCart }) {
//   const [cartItems, setCartItems] = useState([]);

//   const handleAddToCart = (product) => {
//     addToCart(product);

//     const existingItem = cartItems.find((item) => item.id === product.id);

//     if (existingItem) {
//       // If the product is already in the cart, update the quantity
//       setCartItems((prevItems) =>
//         prevItems.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         )
//       );
//     } else {
//       // If the product is not in the cart, add it with a quantity of 1
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//   };

//   return (
//     <div className={`cart ${isOpen ? 'open' : ''}`}>
//       {cartItems.length === 0 ? (
//         <p>No products in the cart</p>
//       ) : (
//         <div>
//           <h2>Shopping Cart</h2>
//           {cartItems.map((item) => (
//             <div key={item.id} className='cart-item'>
//               <img className='cart-img' src={`../images/${item.img}`} alt={item.name} />
//               <div className='cart-details'>
//                 <p>{item.brand} {item.name}</p>
//                 <p>Quantity: {item.quantity}</p>
//                 <p>Total: ${item.price * item.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <button onClick={closeCart}>
//         <FaTimes />
//       </button>
//     </div>
//   );
// }




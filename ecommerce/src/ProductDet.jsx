import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import axios from "axios";
import "./styles.css"
import Navbar from './nav';
import Cart from './cart';
import FeedbackForm from './feedback';
function ProductDet(){
    const { id } = useParams();
    const [info,setProduct]=useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:3001/getidproducts/${id}`)
        .then(res=>setProduct(res.data))
        .catch(err=>console.log(err))
    },[id]);
    let [count, setCount] = useState(1);
    
    function increase() {
      setCount(count + 1);
    }
  
    function decrease() {
      if(count>1){
      setCount(count - 1);
      }else{
        count=1;
      }
    }
    const  addToCart = () => {
      console.log("added to cart ")
      const productToAdd = {
        id: info[0]._id,
        images: info[0].img,  // Update to match the field name in cartSchema
        names: info[0].name,  // Update to match the field name in cartSchema
        price: info[0].price,
        quantity: count,
      };
    
      axios.post('http://localhost:3001/addToCart', productToAdd)
        .then(response => {
          console.log('Product added to cart:', response.data);
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
        });
    };
    
  
  // const [isCartOpen, setIsCartOpen] = useState(false);
    
    return(
        <section id='pro'>
        <Navbar/>
            <div className='s'>
                <div className='p'>
                
                    { info.map((product) => (
                    <div className='box'>
                        <div className="det"><img className="brand3" src={`../images/${product.img}`} alt={product.name} /></div>
                        <div className='detail'>
                            <div className="descrip"><p>{product.brand} {product.name}</p></div>
                            <div className='descrip'><p>{product.desc}</p></div>
                            <div className="prices"><p>${product.price}</p></div>
                            <div className="container">
      <h1>{count}</h1>
      <button onClick={decrease}>-</button>
      <button onClick={increase}>+</button>
      <button onClick={addToCart}>Add To Cart</button>
      <FeedbackForm/>
      {/* <button onClick={() => setIsCartOpen(true)}>Open Cart</button> 
       <Cart isOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} /> */}
       
    </div>
                        </div>
                    </div>


                        
                    ))}
                    
                </div>
            </div>
        </section>

    )

}   
// ProductDet.js
// ProductDet.js
// ProductDet.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './styles.css';
// import Navbar from './nav';
// import Cart from './cart';  // Make sure to import the Cart component

// function ProductDet() {
//   const { id } = useParams();
//   const [info, setProduct] = useState([]);
//   const [count, setCount] = useState(1);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/getidproducts/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.log(err));
//   }, [id]);

//   const increase = () => setCount(count + 1);

//   const decrease = () => setCount(count > 0 ? count - 1 : 0);

//   const handleAddToCart = () => {
//     if (info.length > 0) {
//       // Assuming info contains only one product for simplicity
//       const product = info[0];
//       addToCart(product);
//     }
//   };

//   return (
//     <section id='pro'>
//       <Navbar />
//       <div className='s'>
//         <div className='p'>
//           {info.map((product) => (
//             <div key={product.id} className='box'>
//               {/* ... rest of the code remains the same */}
//               <div className='container'>
//                 <h1>{count}</h1>
//                 <button onClick={decrease}>-</button>
//                 <button onClick={increase}>+</button>
//               </div>
//               <button onClick={handleAddToCart}>Add to Cart</button>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Pass the cart state and a function to close the cart to the Cart component */}
//       <Cart isOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} addToCart={handleAddToCart} />
//     </section>
//   );
// }

export default ProductDet;


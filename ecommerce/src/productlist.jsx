import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import SearchBar from './search';
const ProductList = ({isopen,closecart}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getproducts')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  // Render your product list here using the 'products' stat  const ProductL
    // ...
    
    const handleSearch = (searchTerm) => {
      // Filter products based on the search term
      if(searchTerm){
        const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase().split(" ").join(""))
      );
      setProducts(filteredProducts);
      }else{
        setProducts(products);
      }
  
      // Update the state with filtered products
      
    };
  
    return (
      <div className={`search ${isopen ? 'unrap' : ''}`} style={{overflow:'auto',maxHeight:'2000px'}}>
      <div>
        <SearchBar onSearch={handleSearch} />
        {products.map((pro)=>(
          <Link to={ `/product/${pro._id}`}key={pro._id}>
          <div className="caminfo"><p>{pro.brand} {pro.name}</p></div>
          </Link>
        ))}
        </div>     
         <button onClick={closecart}>
        <FaTimes />
      </button>
      </div>

    );
  };
  


export default ProductList;

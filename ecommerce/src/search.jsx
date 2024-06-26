import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value); // Pass the search term to the parent component
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    // <div>
    //   <input type="text" value={searchTerm} onChange={handleChange} />
    //   <button onClick={handleSearch}>Search</button>
    // </div>
    <form >
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
    />
    <button type="submit">Search</button>
  </form>
  );
};

export default SearchBar;

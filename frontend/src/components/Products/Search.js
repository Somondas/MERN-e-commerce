import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

// ! Search Funtionality not working, route not made yet......
function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <form onSubmit={searchSubmitHandler} className="searchBox">
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
}

export default Search;

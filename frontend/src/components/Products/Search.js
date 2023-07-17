import React, { useState } from 'react';
import "./Search.css";
import { useNavigate } from "react-router-dom";

function Search() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/porducts/${keyword}`)
        } else {
            navigate("/products")
        }
    }
    return (
        <>
            <form onSubmit={searchSubmitHandler} className="searchBox">

                <input
                    type="text"
                    placeholder='Search a Product...'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </>
    )
}

export default Search
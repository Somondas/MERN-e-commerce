import React from 'react';
import "./Home.css";
import Product from "./Product.js";
import MetaData from '../layouts/MetaData';
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const product = {
    name: "Blue TShirt",
    images: [{ url: "https://static.cilory.com/601840-thickbox_default/royal-blue-full-sleeves-t-shirt-by-grunt.jpg" }],
    price: "₹3000",
    _id: "somondas"

}
const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());

    }, [dispatch])


    return (
        <>
            <MetaData title="Ecommerce" />
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS</h1>
                <a href="#container">
                    <button>
                        Scroll
                    </button>
                </a>
            </div>
            <h2 className='homeHeading'>Featured Products</h2>
            <div className="container" id='container'>

                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>




        </>
    );
}

export default Home
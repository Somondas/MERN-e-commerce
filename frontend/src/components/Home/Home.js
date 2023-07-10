import React, { Fragment } from 'react';
import "./Home.css";
import Product from "./Product.js";
import MetaData from '../layouts/MetaData';
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../layouts/Loader/Loader';
import { useAlert } from 'react-alert';
const product = {
    name: "Blue TShirt",
    images: [{ url: "https://static.cilory.com/601840-thickbox_default/royal-blue-full-sleeves-t-shirt-by-grunt.jpg" }],
    price: "₹3000",
    _id: "somondas"

}
const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector((state) => state.products);
    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());

    }, [dispatch, error, alert])


    return (
        <>
            {loading ? <Loader />
                :
                <Fragment>
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
                        {products && products.map((product, key) => (
                            <Product product={product} key={key} />
                        ))}
                    </div>
                </Fragment>
            }



        </>
    );
}

export default Home
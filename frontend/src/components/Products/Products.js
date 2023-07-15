import React, { Fragment, useEffect } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProduct, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert"
import ProductCard from '../Home/ProductCard';

function Products() {

    const dispatch = useDispatch();
    const { products, loading, error, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <div className="productsHeading">Products</div>
                        <div className="products">
                            {
                                products &&
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default Products
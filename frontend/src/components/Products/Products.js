import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProduct, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert"
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";

function Products() {
    const params = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products);
    const keyword = params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    useEffect(() => {
        dispatch(getProduct(keyword))
    }, [dispatch, keyword])

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

                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChage={setCurrentPageNo}
                            />
                        </div>
                    </>
            }
        </>
    )
}

export default Products
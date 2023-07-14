import React, { Fragment, useEffect } from 'react';
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert"

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(
        state => state.productDetails
    )
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError());
        }
        dispatch(getProductDetails(params.id));


    }, [dispatch, params.id, error, alert])
    // console.log(product);
    const options = {
        edit: false,
        color: "rgba(20, 20, 20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true,
    };
    return (
        <>

            {
                loading ? (<Loader />) :
                    (
                        <Fragment>


                            <div className="ProductDetails">
                                <div>
                                    <Carousel>
                                        {product.image &&
                                            product.image.map((item, i) => (
                                                <img
                                                    className="CarouselImage"
                                                    key={i}
                                                    src={item.url}
                                                    alt={`${i} Slide`}
                                                />
                                            ))}
                                    </Carousel>
                                </div>

                                <div>
                                    <div className="detailsBlock-1">
                                        <h2>{product.name}</h2>
                                        <p>Product # {product._id}</p>
                                    </div>
                                    <div className="detailsBlock-2">
                                        <ReactStars {...options} />
                                        <span className="detailsBlock-2-span">
                                            {" "}
                                            ({product.numOfReviews} Reviews)
                                        </span>
                                    </div>
                                    <div className="detailsBlock-3">
                                        <h1>{`₹${product.price}`}</h1>
                                        <div className="detailsBlock-3-1">
                                            <div className="detailsBlock-3-1-1">
                                                <button >-</button>
                                                <input readOnly type="number" value="1" />
                                                <button >+</button>
                                            </div>
                                            <button
                                                disabled={product.Stock < 1 ? true : false}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>

                                        <p>
                                            Status:
                                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                            </b>
                                        </p>
                                    </div>

                                    <div className="detailsBlock-4">
                                        Description : <p>{product.description}</p>
                                    </div>

                                    <button className="submitReview">
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                            <h3 className="reviewsHeading">REVIEWS</h3>

                            {
                                product.reviews && product.reviews[0] ? (
                                    <div className="reviews">
                                        {product.reviews &&
                                            product.reviews.map((review) => (
                                                <ReviewCard review={review} />
                                            ))}
                                    </div>
                                ) :
                                    (
                                        <p className="noReviews">
                                            No Reviews Yet
                                        </p>
                                    )
                            }
                        </Fragment>
                    )
            }
        </>
    )
}

export default ProductDetails
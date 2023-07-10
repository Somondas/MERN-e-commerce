import React, { useEffect } from 'react';
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';


const ProductDetails = ({ match }) => {
    const dispatch = useDispatch()

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    )

    useEffect(() => {

        dispatch(getProductDetails(match.param.id));

    }, [dispatch])

    return (
        <>
            <div className="ProductDetails">
                <Carousel>
                    {product.images &&
                        product.images.map((item, key) => {
                            <img
                                key={item.url}
                                src={item.url}
                                alt={`${key} Slide`}
                            />
                        })

                    }
                </Carousel>
            </div>
        </>
    )
}

export default ProductDetails
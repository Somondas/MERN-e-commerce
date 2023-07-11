import React, { useEffect } from 'react';
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';


const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch()

    const { product, loading, error } = useSelector(
        state => state.productDetails
    )
    console.log(params.id);
    // console.log(match.params.id);
    useEffect(() => {
        dispatch(getProductDetails(params.id));

    }, [dispatch])

    return (
        <>
            <div className="ProductDetails">
                <Carousel>
                    {product.image &&
                        product.image.map((item, key) => (
                            <img
                                className='CarouselImage'
                                key={item.url}
                                src={item.url}
                                alt={`${key} Slide`}
                            />
                        ))

                    }
                </Carousel>
            </div>
        </>
    )
}

export default ProductDetails
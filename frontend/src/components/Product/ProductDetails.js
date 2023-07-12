import React, { useEffect } from 'react';
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';


const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch()

    const { loading, error, product } = useSelector(
        state => state.productDetails
    )
    // console.log(params.id);
    // console.log(match.params.id);
    useEffect(() => {
        dispatch(getProductDetails(params.id));


    }, [dispatch, params.id, error])
    console.log(product);
    return (
        <>
            <div className="ProductDetails">
                <Carousel>
                    {
                        product.image &&
                        product.image.map((item, i) => (
                            <img
                                className='CarouselImage'
                                src={item.url}
                                key={i}
                                alt={item.name}
                            />
                        ))
                    }
                </Carousel>
            </div>
            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>

            </div>
        </>
    )
}

export default ProductDetails
import React, {useContext} from 'react'
import './ProductDisplay.css'
import star from "../Assets/logosIcons/star.png"
import star_empty from "../Assets/logosIcons/star_empty.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            {/* 
            <div className='productdisplay-img-list'>
                <img src={product.image} alt=""></img>
                <img src={product.image} alt=""></img>
                <img src={product.image} alt=""></img>
                <img src={product.image} alt=""></img>
            </div>*/}
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt=""></img>
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star} alt=""></img>
                <img src={star} alt=""></img>
                <img src={star} alt=""></img>
                <img src={star} alt=""></img>
                <img src={star_empty} alt=''></img>
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                {product.price}$
            </div>
            <div className="productdisplay-right-description">
                {product.description}
            </div>
            {product.category === 'clothes' && (
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>XS</div>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                    </div>
                </div>
            )}
            {localStorage.getItem('auth-token')?<button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>:<></>}
            <p className="productdisplay-right-category"><span>Category: {product.category}</span></p>
        </div>
    </div>
  )
}

export default ProductDisplay

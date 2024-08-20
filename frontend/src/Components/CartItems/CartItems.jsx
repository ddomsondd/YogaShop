import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/logosIcons/bin.png'

const CartItems = () => {
    const {getTotalCartAmount, all_products, cartItems, removeFromCart} = useContext(ShopContext);
    const filteredProducts = all_products.filter(e => cartItems[e.id] > 0);
  return (
    <div>
        <div className="banner">
            <h1>YOUR SHOPPING CART</h1>
        </div>
        
    <div className='cartitems'>
        
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {filteredProducts.map((e) => (
                <div key={e.id}>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className='carticon-product-icon'></img>
                        <p>{e.name}</p>
                        <p>${e.price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>${e.price * cartItems[e.id]}</p>
                        <img className="cartitems-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id)} alt=""></img>
                    </div>
                    <hr />
                </div>
            ))}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                    </div>
                    <button>
                        PROCEED TO CHECKOUT
                    </button>
                </div>
                <div className="cartitems-promocode">
                <p>If you have a promo code, enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder="Promocode"></input>
                    <button>Submit</button>
                </div>
            </div>
            </div>
        
    </div>
    </div>
    
  )
}

export default CartItems

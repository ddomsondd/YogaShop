import React from "react";
import { ShopContext } from "../Context/ShopContext";
import './CSS/ShopCategory.css';
import Item from "../Components/Item/Item"
import arrow from "../Components/Assets/arrows/down.png"

const ShopCategory = (props) => {
    const {all_products} = React.useContext(ShopContext);
    const filteredProducts = all_products.filter(product => product.category === props.category);
    const productsToShow = filteredProducts.slice(0, 12);
    
    return (
        <div className="shop-category">
            <div className="banner">
                <h1>{props.category}</h1>
            </div>
        {/*    <img className="shopcategory-banner" src={props.banner} alt="" /> */}
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 0-{productsToShow.length}</span> out of {filteredProducts.length} results 
                </p>
                <div className="shopcategory-sort">
                    {/* 
                    Sort by <img src={arrow} alt=""/>
                    */}
                </div>
            </div>
            <div className="shopcategory-products">
                {productsToShow.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
                ))}
                {/*
                {all_products.map((item,i)=>{
                    
                    if(props.category===item.category){
                        console.log(item.image)
                        return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}></Item>
                    } else return null;
                })}*/}
            </div>
        </div>
    )
}

export default ShopCategory;
import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img src={props.image} alt=""></img></Link>
      
      <div className='bolder'>
        <p>{props.name}</p>
      </div>
      <div className='item-price'>
        <p>{props.price} $</p>
      </div>
    </div>
  )
}

export default Item

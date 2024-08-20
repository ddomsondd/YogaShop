import React from 'react'
import './Breadcrum.css'
import next from '../Assets/arrows/next.png'
import { Link } from 'react-router-dom';

const Breadcrum = (props) => {
    const {product} = props;

  return (
    <div className='breadcrum'>
      <Link style={{textDecoration: 'none', color: "black"}} to='/'>HOME </Link><img src={next} alt=""/> <Link style={{textDecoration: 'none', color: "black"}} to={`/${product.category.toLowerCase()}`}>{product.category}</Link><img src={next} alt=""/>{product.name}
    </div>
  )
}

export default Breadcrum

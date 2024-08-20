import React from 'react'
import './Hero.css'
import arrow from '../../Assets/arrows/arrow.png'
import new_arr from '../../Assets/logosIcons/new_arr.png'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div className='hero-tag'>
                <p>new</p>
                <p>products</p>
                <p>for yoga lovers</p>
            </div>
            <Link style={{textDecoration: 'none', color: "black"}} to='/clothes'>
                <div className='hero-latest-btn'>
                    <div>Latest Collection</div>
                    <img src={ arrow } alt="arrow" />
                </div>
            </Link>
            
        </div>
      
        <div className="hero-right">
            <img src={ new_arr } alt="" />
        </div>
    </div>
  )
}

export default Hero

import React from 'react'
import './Footer.css'
import logo from '../Assets/logosIcons/logo.jpg'
import facebook from '../Assets/media/facebook.png'
import instagram from '../Assets/media/instagram.png'
import twitter from '../Assets/media/twitter.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={logo} alt="logo" />
            <p>Lovin' yogin</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='footer-social-icon'>
            <div className='social-icons'>
                <img src={facebook} alt="facebook"/>
                <img src={instagram} alt="instagram"/>
                <img src={twitter} alt="twitter"/>
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 - All Right Reserved.</p>
        </div>
      
    </div>
  )
}

export default Footer

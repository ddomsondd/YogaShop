import React from 'react'
import './Navbar.css'
import logo from "../../assets/logosIcons/logo.jpg" 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
          
        <img  src={logo} alt="logo" />
        <p>Lovin' yogin'</p>
      </div>
    </div>
  )
}

export default Navbar

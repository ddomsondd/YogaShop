import React from "react";
import { useState, useContext, useRef } from "react";
import './Navbar.css';
import logo from '../Assets/logosIcons/logo.jpg';
import shop from '../Assets/logosIcons/shopping-cart.png';
import { Link } from 'react-router-dom';
import { ShopContext } from "../../Context/ShopContext";
import down from '../Assets/arrows/down.png'

const Navbar = () => {

  const [menu, setMenu] = useState("about");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className="navbar">
        <div className="nav-logo">
          <img  src={logo} alt="logo" />
          <p>Lovin' yogin</p>
        </div>
        <img className="nav-dropdown" onClick={dropdown_toggle} src={down} alt=""/>
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("about")}}><Link style={{textDecoration: 'none', color: "black"}} to='/'>About</Link>{menu==="about"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mats")}}><Link style={{textDecoration: 'none', color: "black"}} to='/mats'>Mats</Link>{menu==="mats"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("clothes")}}><Link style={{textDecoration: 'none', color: "black"}} to='/clothes'>Clothes</Link>{menu==="clothes"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("accessories")}}><Link style={{textDecoration: 'none', color: "black"}} to='/accessories'>Accessories</Link>{menu==="accessories"?<hr/>:<></>}</li>
        </ul>

        <div className="nav-login-cart">
          {localStorage.getItem('auth-token')
          ?<>
              <button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
              <Link to='/card'><img src={shop} alt="shop" /></Link>
              <div className="nav-cart-count">{getTotalCartItems()}</div>
            </>
            :<Link to='/login'><button>Login</button></Link>}
            
            
        </div>
    </div>
  )
}

export default Navbar;
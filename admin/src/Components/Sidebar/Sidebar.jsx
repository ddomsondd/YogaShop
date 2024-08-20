import React from 'react'
import './Sidebar.css'
import {Link} from "react-router-dom"
import add from "../../assets/logosIcons/add.png"
import list from "../../assets/logosIcons/list.png"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none", color: "black"}}>
        <div className="sidebar-item">
            <img src={add} alt=""/>
            <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none", color: "black"}}>
        <div className="sidebar-item">
            <img src={list} alt=""/>
            <p>Product List</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar

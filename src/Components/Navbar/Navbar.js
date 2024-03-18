import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
const Navbar = () => {
  return (
    <nav className='container'>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
          <h1>GOLD's</h1>
          <p>
            Fitness & Exercises
          </p>
          </Link>
        </div>
        <div className="links">
          <Link to="/">
            Home
          </Link>
          <Link to="/exercises">
            Exercises
          </Link>
        </div>
      </div>
    </nav>
    )
}

export default Navbar
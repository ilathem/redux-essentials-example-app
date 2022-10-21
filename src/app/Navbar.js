import React from 'react'
import { Link } from 'react-router-dom' // for navigation

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks"></div>
          {/* link to the main posts page */}
          <div className='navLinks'>
            <Link to="/">Posts</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}

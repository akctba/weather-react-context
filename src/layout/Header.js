import React from 'react'
import { Link } from 'react-router-dom';

function Header(){
    return(
        <>
          <div className="header">
              <h1>Weather React Context</h1>
              <ul>
                <li><Link to="/">Weather</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
          </div>
        </>
    )
  }
  export default Header;
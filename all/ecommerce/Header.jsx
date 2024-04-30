import React from "react";
import { NavLink } from 'react-router-dom';

function Header({ cartLength }) {
  return (
    <>
      <nav>
        <h2>Ecommerce</h2>
        <ul>
          <li>
            <NavLink to="">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart <span>{cartLength}</span></NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;

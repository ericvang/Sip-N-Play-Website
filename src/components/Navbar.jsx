import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
        <NavLink to="/" className="w-20 h-20 rounded-lg bg-white items-start justify-normal flex font-bold shadow-md">
            <img src="src/assets/images/IMG_9701.png"></img>
        </NavLink>
        </header>
  )
}

export default Navbar
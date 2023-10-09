import React from "react";
import Logo from "../assets/Menu_Masters_Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <Link to="/Menu">
          <img src={Logo} className="w-56 h-auto" />
        </Link>

        <div className="flex flex-row gap-x-5 px-6 ">
          <h1>Tafel 1</h1>

          <div>ShoppingCart</div>
          <div>Taal</div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React from "react";
import Logo from "../assets/Menu_Masters_Logo.png";

const Header = () => {
  return (
    <nav className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <img src={Logo} className="w-56 h-auto" />
        <div className="flex flex-row gap-x-3 px-6">
          <div>Tafel</div>
          <div>Kart</div>
          <div>Taal</div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

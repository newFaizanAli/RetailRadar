import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();



  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-opacity-50 text-white p-4 flex justify-between items-center">
      {/* Brand/Logo */}
      <div
        className="text-lg font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        RetailsHunter
      </div>

    
      <div>
        
          <button
            className="bg-indigo-500 text-white font-medium px-4 py-2 rounded hover:bg-white hover:text-indigo-500 transition duration-300"
            onClick={() => navigate("/")}
          >
            Huniting
          </button>
       
      </div>
    </nav>
  );
};

export default Navbar;

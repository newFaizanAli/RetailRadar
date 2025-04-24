import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoleContext } from "../../context/Context";
import { Fetchdata } from "../lib/handleFetch/FetchData";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(UserRoleContext);

  const handleLogout = useCallback(async () => {
    const resp = await Fetchdata("GET", "/logout");
    if (resp.logout && resp.logout === true) {
      logout();
      navigate("/signin");
    }
  }, [logout, navigate]);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-opacity-50 text-white p-4 flex justify-between items-center">
      {/* Brand/Logo */}
      <div
        className="text-lg font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        RetailsHunter
      </div>

      {/*       
        <img
                    src="/assets/logo.png"
                    alt="/assets/logo.png"
                    style={{ width: "80px", height: "80px" }}
                  /> */}

      {/* Authentication Buttons */}
      <div>
        
          <button
            className="bg-indigo-500 text-white font-medium px-4 py-2 rounded hover:bg-white hover:text-indigo-500 transition duration-300"
            onClick={() => navigate("/hunting")}
          >
            Huniting
          </button>
       
      </div>
    </nav>
  );
};

export default Navbar;

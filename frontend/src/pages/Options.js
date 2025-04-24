import React from "react";
import { Link } from "react-router-dom";

const OptionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-orange-50">
      <div className="flex gap-8 justify-center flex-wrap">
        <div className="flex flex-wrap gap-8 justify-center">
          {/* General Store Card */}
          <Link
            to={"/admin/dashboard"}
            className="w-80 h-56 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
          >
            <span className="material-icons text-6xl">storefront</span>
            <span className="text-3xl font-semibold">General Store</span>
          </Link>

         
          <Link
            to={"/pos/dashboard"}
            className="w-80 h-56 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
          >
            <span className="material-icons text-6xl">point_of_sale</span>
            <span className="text-3xl font-semibold">POS</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OptionsPage;

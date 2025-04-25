import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 text-gray-900 font-poppins">
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;

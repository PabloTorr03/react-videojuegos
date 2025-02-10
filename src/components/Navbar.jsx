import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#282828] flex items-center justify-between p-4 relative">
      {/* Contenedor del logo y el título */}
      <div className="flex items-center space-x-4">
        <img src={logo} className="h-16 w-20" alt="Logo" />
        <span className="text-2xl sm:text-3xl font-semibold text-gray-200 whitespace-nowrap">
          Videojuegos Project
        </span>
      </div>

      {/* Botón de menú para móviles */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-200 hover:text-gray-400 transition">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Links de navegación */}
      <div className={`absolute top-20 left-0 w-full bg-[#282828] ${menuOpen ? 'flex flex-col mt-2' : 'hidden'} md:flex md:relative md:top-0 md:w-auto md:mt-0 md:flex-row md:space-x-6`}>
        <NavLink to="/" className={({ isActive }) => `text-lg sm:text-2xl font-semibold ${isActive ? "text-gray-400" : "text-gray-200"} hover:text-gray-400 transition`}>
          Home
        </NavLink>
        <NavLink to="/Games" className={({ isActive }) => `text-lg sm:text-2xl font-semibold ${isActive ? "text-gray-400" : "text-gray-200"} hover:text-gray-400 transition`}>
          VideoJuegos
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

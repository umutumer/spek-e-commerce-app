import React from "react";
import { FaUser } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";

const Navbar = () => {
    const navigate =useNavigate();
  return (
    <nav className="flex sm:flex-row flex-col items-center sm:justify-between justify-center bg-white dark:bg-slate-900 w-full sm:h-28 h-40">
      <div className="p-2 sm:w-[20%] w-full text-center">
        <h3 className="text-black dark:text-white text-xl font-semibold">SPEK E COMMERCE</h3>
      </div>
      <div className="p-2 sm:w-[50%] w-full relative">
        <input
          type="search"
          className="text-black bg-gray-100 dark:text-white dark:bg-slate-700 w-full h-10 rounded-md p-2"
          placeholder="Aradığınız ürünü buraya yazın..."
        />
        <button className="absolute top-4 right-3 text-2xl text-orange-500 dark:text-slate-300"><IoIosSearch /></button>
      </div>
      <div className="p-2 sm:w-[30%] w-full flex items-center justify-center">
        <button onClick={() =>navigate('/login')} className="flex items-center mx-2  hover:text-orange-500 duration-200 text-black dark:text-white font-medium dark:hover:text-blue-600 ">
          <FaUser className="mr-1" />
          Hesabım
        </button>{" "}
        <button className="flex items-center mx-2 hover:text-orange-500 duration-200 text-black dark:text-white font-medium dark:hover:text-blue-600 ">
          <MdFavorite className="mr-1" />
          Favorilerim
        </button>
        <button className="flex items-center mx-2  hover:text-orange-500 duration-200 text-black dark:text-white font-medium dark:hover:text-blue-600 ">
          <FaCartShopping className="mr-1" />
          Sepet
        </button>{" "}
        {/* & ThemeColor */}
      </div>
    </nav>
  );
};

export default Navbar;

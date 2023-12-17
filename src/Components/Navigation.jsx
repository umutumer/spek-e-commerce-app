import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";
import { DarkThemeToggle } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../Redux/SearchSlice";
import { FaUser } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";


const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setLocalSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    dispatch(setSearchQuery(localSearchQuery));
    setLocalSearchQuery("");
  };

  return (
    
    <nav className="flex sm:flex-row flex-col items-center sm:justify-between justify-center bg-white dark:bg-slate-900 w-full sm:h-28 h-40">
      <div className="p-2 sm:w-[20%] w-full text-center">
        <h3 className="text-black dark:text-white text-xl font-semibold">
          SPEK E COMMERCE
        </h3>
      </div>
      <div className="p-2 sm:w-[50%] w-full relative">
        <input
          onChange={handleSearchInputChange}
          type="text"
          className="w-full h-10 p-2 rounded border border-gray-300 dark:border-blue-600 focus:outline-none focus:border-1 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
          placeholder="Aradığınız ürünü buraya yazın..."
        />
        <button 
          onClick={handleSearchButtonClick}
          className="absolute top-4 right-3 text-2xl text-orange-500 dark:text-slate-300">
          <IoIosSearch />
        </button>
      </div>
      <div className="p-2 sm:w-[30%] w-full flex items-center justify-center">
      <button
          onClick={() => navigate("/login")}
          className="flex items-center mx-2  hover:text-orange-500 duration-200 text-black dark:text-white font-medium dark:hover:text-blue-600 "
        >
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
        <DarkThemeToggle className="text-black dark:text-white" />
      </div>
    </nav>
  );
};

export default Navigation;

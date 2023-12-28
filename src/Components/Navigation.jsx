import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";
import { DarkThemeToggle } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../Redux/SearchSlice";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { getUser , logout } from "../Redux/Action";
import { Link } from "react-router-dom";
import { GoTriangleUp } from "react-icons/go";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.isLogin)
    : null;
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const handleSearchInputChange = (event) => {
    setLocalSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    dispatch(setSearchQuery(localSearchQuery));
    setLocalSearchQuery("");
  };
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  

  return (
    <nav className="flex sm:flex-row flex-col items-center sm:justify-between justify-center bg-white dark:bg-slate-900 w-full sm:h-28 h-40">
      <div className="p-2 sm:w-[20%] w-full text-center">
        <Link to='/' className="text-black dark:text-white text-xl font-semibold">
          SPEK E COMMERCE
        </Link>
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
          className="absolute top-4 right-3 text-2xl text-orange-500 dark:text-slate-300"
        >
          <IoIosSearch />
        </button>
      </div>
      <div className="p-2 sm:w-[30%] w-full flex items-center justify-center relative">
        {loggedInUser ? (
         <div className="relative">
           <button
            onClick={() => toggleDropdown()}
            className="flex items-center mx-2 hover:text-orange-500 duration-200 text-black dark:text-white font-medium dark:hover:text-blue-600 "
          >
            <FaUser className="mr-1" />
            Hesabım
          </button>
          {isDropdownOpen && (
          <div className="w-40 absolute top-8 -left-6 flex flex-col items-center bg-white dark:bg-slate-900 dark:text-white border-2 dark:border-slate-700 rounded z-50 duration-300 ">
            <Link to='/userinformation' className="w-full py-1 border-b dark:border-slate-700 text-center">
              Kullanıcı Bilgilerim
            </Link>
            <Link to={'/myorders'} className="w-full py-1 border-b dark:border-slate-700 text-center">
              Siparişlerim
            </Link>
            {loggedInUser.status === "Admin" && (
              <Link to='/admin' className="w-full py-1 border-b dark:border-slate-700 text-center">Admin</Link>
            )}
            <button
            onClick={() => dispatch(logout(loggedInUser.id))}
            className="w-full  py-1 text-center">Çıkış Yap</button>
            <div className="absolute -top-5  z-40">
              <GoTriangleUp className="text-gray-300 dark:text-slate-700 text-3xl" />
            </div>
          </div>
        )}
         </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center mx-2  hover:text-orange-500 duration-200 text-black dark:text-white font-medium dark:hover:text-blue-600 "
          >
            <FaUserPlus className="mr-1" />
            Giriş Yap
          </button>
        )}
        <button onClick={() => navigate('/favorites')} className="flex items-center mx-2 hover:text-orange-500 duration-200 text-black dark:text-white font-medium dark:hover:text-blue-600 ">
          <MdFavorite className="mr-1" />
          Favorilerim
        </button>
       {loggedInUser ? (
         <Link to='/cart' className="flex items-center mx-2  hover:text-orange-500 duration-200 text-black dark:text-white font-medium dark:hover:text-blue-600 ">
         <FaCartShopping className="mr-1" />
         Sepet
       </Link>
       ):(
        <Link to='/login' className="flex items-center mx-2  hover:text-orange-500 duration-200 text-black dark:text-white font-medium dark:hover:text-blue-600 ">
         <FaCartShopping className="mr-1" />
         Sepet
       </Link>
       )
       }
        <DarkThemeToggle className="text-black dark:text-white" />
      </div>
    </nav>
  );
};

export default Navigation;

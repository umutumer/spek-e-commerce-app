import React from "react";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { FaPeopleCarryBox, FaUsers } from "react-icons/fa6";

const AdminSideBar = () => {
  return (
    <div className="fixed h-screen md:w-72 w-28 flex flex-col items-center bg-orange-500 text-white duration-300">
      <Link
        to="/admin"
        className="md:text-3xl text-lg font-semibold w-full text-center my-20"
      >
        SPEK E COMMERCE
      </Link>
      <Link
        to="/admin/product"
        className="bg-orange-600 p-2 md:w-60 w-24 text-center mb-2 border border-orange-700 hover:shadow-lg duration-300 hover:shadow-orange-700 flex items-center justify-center md:text-base text-xl"
      >
        {" "}
        <FaClipboardList /> <span className="md:block hidden">Ürünler</span>
      </Link>
      <Link
        to="/admin/orders"
        className="bg-orange-600 p-2 md:w-60 w-24 text-center mb-2 border border-orange-700 hover:shadow-lg duration-300 hover:shadow-orange-700 flex items-center justify-center md:text-base text-xl"
      >
        <FaPeopleCarryBox /> <span className="md:block hidden">Siparişler</span>
      </Link>
      <Link
        to="/admin/users"
        className="bg-orange-600 p-2 md:w-60 w-24 text-center mb-2 border border-orange-700 hover:shadow-lg duration-300 hover:shadow-orange-700 flex items-center justify-center md:text-base text-xl"
      >
        <FaUsers />
        <span className="md:block hidden">Üyeler</span>
      </Link>
    </div>
  );
};

export default AdminSideBar;

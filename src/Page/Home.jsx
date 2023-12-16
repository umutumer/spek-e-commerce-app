import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import {  useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Redux/Action";

const Home = () => {
    const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  console.log(product);
  const [selectedCategory, SetSelectedCategory] = useState("Tüm Ürünler");

  const filteredProduct = product.filter((prod) => {
    if (selectedCategory === "Tüm Ürünler") {
      return true;
    } else {
      return prod.kategori === selectedCategory;
    }
  });
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <div className="w-full h-6 flex border-b justify-around bg-white dark:bg-slate-900 dark:border-slate-700">
        {selectedCategory && selectedCategory !== "Tüm Ürünler" && (
          <button
            onClick={() => SetSelectedCategory("Tüm Ürünler")}
            className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200 text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
          >
            Tüm Ürünler
          </button>
        )}
        <button
          onClick={() => SetSelectedCategory("Kadın")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200 text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          Kadın
        </button>
        <button
          onClick={() => SetSelectedCategory("Erkek")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200  text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          Erkek
        </button>
        <button
          onClick={() => SetSelectedCategory("AnneCocuk")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200  text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          Anne & Çocuk
        </button>
        <button
          onClick={() => SetSelectedCategory("EvYasam")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200  text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          Ev & Yaşam
        </button>
        <button
          onClick={() => SetSelectedCategory("Supermarket")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200  text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          SüperMarket
        </button>
        <button
          onClick={() => SetSelectedCategory("Kozmetik")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200  text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          Kozmetik
        </button>
        <button
          onClick={() => SetSelectedCategory("AyakkabiCanta")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200  text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          Ayakkabı & Çanta
        </button>
        <button
          onClick={() => SetSelectedCategory("Elektronik")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200  text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          Elektronik
        </button>
        <button
          onClick={() => SetSelectedCategory("SporOutdoor")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200  text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          Spor & Outdoor
        </button>
        <button
          onClick={() => SetSelectedCategory("CokSatanlar")}
          className="hover:text-orange-500 hover:border-b-2 hover:border-orange-500 duration-200  text-black dark:text-white dark:hover:text-blue-600 dark:hover:border-blue-600"
        >
          Çok Satanlar
        </button>
      </div>
      <div className="w-full flex flex-wrap justify-center bg-white dark:bg-slate-800 dark:text-white">
        {
            filteredProduct.map((prod,index) => (
                <div key={index} className=" w-52 h-96 border bg-white dark:bg-slate-900 dark:border-slate-600 m-5">
                    <img src={prod.resim} alt="" className=" w-full h-72" />
                    <p className="m-0.5">{prod.urunAdi}</p>
                    <p className="m-0.5">{prod.fiyat}₺</p>
                    <div className="w-full flex justify-center">
                    <button className="bg-orange-500 text-white w-48 h-7 rounded-xl m-0.5 dark:bg-blue-600">Sepete Ekle</button>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default Home;

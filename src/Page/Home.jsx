import React, { useEffect, useState } from "react";
import Navigation from "../Components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProduct, getUser } from "../Redux/Action";
import { Navbar } from "flowbite-react";
import { setSearchQuery } from "../Redux/SearchSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const users = useSelector((state) => state.users);
  const isLoggedIn = users.find((user) => user.isLogin);
  const UserId = isLoggedIn ? isLoggedIn.id : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tüm Ürünler");

  const categories = [
    "Tüm Ürünler",
    "Kadın",
    "Erkek",
    "AnneCocuk",
    "EvYasam",
    "Supermarket",
    "Kozmetik",
    "AyakkabiCanta",
    "Elektronik",
    "SporOutdoor",
    "CokSatanlar",
  ];

  const filteredProduct = product.filter((prod) => {
    const categoryFilter =
      selectedCategory === "Tüm Ürünler" || prod.kategori === selectedCategory;

    const searchFilter = prod.urunAdi
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return searchQuery ? searchFilter : categoryFilter && searchFilter;
  });

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
    dispatch(setSearchQuery(""));
  };
  const handleAddToCart = (product) =>{
      if (UserId) {
        dispatch(addToCart(UserId,product))
      }
  }
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col relative">
      <Navigation />

      <div className="w-full flex items-center justify-center border-b bg-white dark:bg-slate-900 dark:border-slate-700 relative">
        <Navbar className="flex  bg-white dark:bg-slate-900">
          <Navbar.Toggle
            className="absolute right-8 -top-12"
            onClick={handleMenuToggle}
          />
          <Navbar.Collapse
            className={`w-full ${isMenuOpen ? "block" : "hidden"}`}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`hover:text-orange-500 duration-200 text-black dark:text-white dark:hover:text-blue-600 ${
                  selectedCategory === category
                    ? "text-orange-500 dark:text-blue-600"
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div className="w-full flex flex-wrap justify-center bg-white dark:bg-slate-800 dark:text-white min-h-screen">
        {filteredProduct.map((prod, index) => (
          <div
            key={index}
            className=" md:w-52 w-40 md:h-96 border bg-white dark:bg-slate-900 dark:border-slate-600 m-5 relative"
          >
            <Link to={`/details/${prod.id}`}>
              <img src={prod.resim} alt="" className=" w-full md:h-72 h-60" />
              <p className="m-0.5">{prod.urunAdi}</p>
              <p className="m-0.5">{prod.fiyat}₺</p>
            </Link>
            <div className="w-full flex justify-center">
              <button
              onClick={()=> handleAddToCart(prod)}
               className="bg-orange-500 text-white w-48 h-7 rounded-xl m-0.5 dark:bg-blue-600">
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

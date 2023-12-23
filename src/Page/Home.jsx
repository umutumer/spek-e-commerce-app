import React, { useEffect, useState } from "react";
import Navigation from "../Components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorites,
  addToCart,
  deleteFavorites,
  getProduct,
  getUser,
} from "../Redux/Action";
import { Button, Navbar } from "flowbite-react";
import { setSearchQuery } from "../Redux/SearchSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const users = useSelector((state) => state.users);
  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.isLogin)
    : null;
  const UserId = loggedInUser ? loggedInUser.id : null;
  const userFavorite = loggedInUser ? loggedInUser.favoriler : null;
  console.log(userFavorite);

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
  const handleAddToCart = (product) => {
    if (UserId) {
      dispatch(addToCart(UserId, product));
      toast.success("Sepete Eklendi!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handleAddToFavorite = (product) => {
    if (UserId) {
      dispatch(addFavorites(UserId, product)).then(() => {
        dispatch(getUser());
      });
    }
  };
  const handleDeleteToFavorite = (product) => {
    if (UserId) {
      dispatch(deleteFavorites(UserId, product)).then(() => {
        dispatch(getUser());
      });
    }
  };
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
                onClick={() => handleAddToCart(prod)}
                className="bg-orange-500 text-white w-48 h-7 rounded-xl m-0.5 dark:bg-blue-600"
              >
                Sepete Ekle
              </button>
            </div>
            <div>
            {userFavorite && userFavorite.length > 0 ? (
                userFavorite.map((favorite, index) => (
                  <div key={index} className="absolute top-2 right-2">
                    {favorite.id === prod.id ? (
                      <button onClick={() => handleDeleteToFavorite(prod)}>
                        <FaHeart className="text-orange-500 dark:text-blue-500 text-xl z-30" />
                      </button>
                    ) : (
                      <button onClick={() => handleAddToFavorite(prod)}>
                        <FaRegHeart className="text-orange-500 dark:text-blue-500 text-xl z-30" />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="absolute top-2 right-2">
                  <button onClick={() => handleAddToFavorite(prod)}>
                    <FaRegHeart className="text-orange-500 dark:text-blue-500 text-xl z-30" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

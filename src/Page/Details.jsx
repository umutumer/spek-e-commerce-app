import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Navigation from "../Components/Navigation";
import { Link } from "react-router-dom";
import { addToCart, getProduct, getUser } from "../Redux/Action";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    state.product.find((product) => product.id === parseInt(id))
  );
  const sameCategory = useSelector((state) =>
    state.product.filter(
      (prod) => prod.kategori === products.kategori && prod.id !== products.id
    )
  );
  const users = useSelector((state) => state.users);
  const isLoggedIn = users.find((user) => user.isLogin);
  const UserId = isLoggedIn ? isLoggedIn.id : null;

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
    <div className="w-full h-full flex flex-col items-center min-h-screen bg-white text-black dark:bg-slate-800 dark:text-white">
      <Navigation />
      <div className="w-full flex justify-center">
        <div className="sm:w-[54rem] w-full flex flex-wrap items-center justify-center mt-2  border dark:border-slate-600">
          <div className="sm:w-96 w-full sm:h-[36rem] m-5">
            <img
              src={products.resim}
              alt="ürünresim"
              className="w-full h-full"
            />
          </div>
          <div className="sm:w-96 sm:h-[36rem] w-full m-5">
            <p className="mb-2">
              <span className="text-orange-500 font-bold text-lg dark:text-blue-600">
                Ürün Adı:
              </span>{" "}
              {products.urunAdi}
            </p>
            {products.marka && (
              <p className="mb-2">
                <span className="text-orange-500 font-bold text-lg dark:text-blue-600">
                  Marka:
                </span>{" "}
                {products.marka}
              </p>
            )}
            {products.renk && (
              <p className="mb-2">
                <span className="text-orange-500 font-bold text-lg dark:text-blue-600">
                  Renk:
                </span>{" "}
                {products.renk}
              </p>
            )}
            <p className="mb-2">
              <span className="text-orange-500 font-bold text-lg dark:text-blue-600">
                Kategori:
              </span>{" "}
              {products.kategori}
            </p>
            {products.beden && (
              <p className="mb-2">
                <span className="text-orange-500 font-bold text-lg dark:text-blue-600">
                  Ürün Bedeni:
                </span>{" "}
                {products.beden}
              </p>
            )}
            <p className="mb-2">
              <span className="text-orange-500 font-bold text-lg dark:text-blue-600">
                Fiyat:
              </span>{" "}
              {products.fiyat}₺
            </p>
            <button onClick={() => handleAddToCart(products)} className="bg-orange-500 text-white w-[90%] h-7 rounded-xl my-5 dark:bg-blue-600">
              Sepete Ekle
            </button>
            <p>
              <span className="text-orange-500 font-bold text-lg dark:text-blue-600">
                Ürün Açıklaması:{" "}
              </span>
              {products.urunaciklama}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <h3 className="text-2xl font-medium text-orange-500 dark:text-blue-600">Aynı Kategorideki Ürünler</h3>
        <div className="flex items-center flex-wrap">
          {sameCategory.map((prod, index) => (
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
                <button className="bg-orange-500 text-white w-48 h-7 rounded-xl m-0.5 dark:bg-blue-600">
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;

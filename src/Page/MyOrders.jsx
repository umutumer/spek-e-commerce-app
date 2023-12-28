import React from "react";
import Navigation from "../Components/Navigation";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const users = useSelector((state) => state.users);
  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.isLogin)
    : null;
  const myOrderList = loggedInUser && loggedInUser.siparislerim;
  console.log(myOrderList && myOrderList);
  return (
    <div className="bg-white text-black dark:bg-slate-800 dark:text-white min-h-screen w-full h-full">
      <Navigation />
      <div className="w-full h-full mt-5">
        <h2 className="text-center w-full text-3xl">Siparişlerim</h2>
        {myOrderList && myOrderList.map((order, index) => (
          <div key={index} className="relavite w-full">
            <p className="absolute right-5 bg-orange-500 dark:bg-blue-600 text-white m-2 py-1 px-2 rounded">Sipariş Durumu: {order.siparis.siparisDurumu}</p>
            <div className="m-5 border dark:border-slate-600">
              {order.siparis.ürünler.map((product) => (
                <div key={product.id} className="flex items-center justify-between w-full bg-gray-100 dark:bg-slate-700">
                  <img src={product.resim} alt={product.urunAdi} className="w-20 h-32 m-1" />
                  <p>{product.urunAdi}</p>
                  {product.toplamFiyat ? <p>ToplamFiyat: {product.toplamFiyat}₺</p>:<p>Fiyat: {product.fiyat}₺</p>}
                  {product.renk && <p>Renk: {product.renk}</p>}
                  {product.marka && <p>Marka: {product.marka}</p>}
                  {product.beden && <p>Renk: {product.beden}</p>}
                  <p className="mr-1">Adet: {product.adet}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;

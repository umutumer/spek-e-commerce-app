import React, { useEffect } from "react";
import Navigation from "../Components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/Action";

const MyOrders = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.isLogin)
    : null;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="bg-white text-black dark:bg-slate-800 dark:text-white min-h-screen w-full h-full">
      <Navigation />
      <div className="w-full h-full mt-5 flex flex-col items-center">
        <h2 className="text-center w-full text-3xl">Siparişlerim</h2>
        {loggedInUser &&
          loggedInUser.siparislerim &&
          Array.isArray(loggedInUser.siparislerim) &&
          loggedInUser.siparislerim
            .slice()
            .reverse()
            .map((order, orderIndex) => (
              <div
                key={orderIndex}
                className="w-[90%] h-56 flex items-center justify-between border mt-5 relative dark:border-slate-600 dark:bg-slate-700"
              >
                {order
                  .slice()
                  .reverse()
                  .map((orderItem, orderItemIndex) => (
                    <div
                      key={`${orderIndex}-${orderItemIndex}`}
                      className="w-full h-full flex items-center justify-between relative dark:border-slate-600 dark:bg-slate-700"
                    >
                      <img
                        src={orderItem.siparis.ürünler[orderItemIndex].resim}
                        alt={orderItem.siparis.ürünler[orderItemIndex].urunAdi}
                        className="w-32 h-full"
                      />
                      <p>
                        Ürün Adı:{" "}
                        {
                          orderItem.siparis.ürünler[orderItemIndex].urunAdi
                        }
                      </p>
                      <p>
                        Adet:{" "}
                        {orderItem.siparis.ürünler[orderItemIndex].adet}
                      </p>
                      <p className="mr-5">
                        Fiyat:{" "}
                        {orderItem.siparis.ürünler[orderItemIndex].toplamFiyat
                          ? orderItem.siparis.ürünler[orderItemIndex].toplamFiyat
                          : orderItem.siparis.ürünler[orderItemIndex].fiyat}
                        ₺
                      </p>
                      <div className="absolute right-2 top-2 px-2 py-1 bg-orange-500 dark:bg-blue-600 text-white rounded">
                        <p>Sipariş Durumu: {orderItem.siparis.siparisDurumu}</p>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
      </div>
    </div>
  );
};

export default MyOrders;

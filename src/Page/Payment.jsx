import React from "react";
import Navigation from "../Components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaTrash } from "react-icons/fa";
import { getUser, paymentConfirm, removeFromCart, resetCart } from "../Redux/Action";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.isLogin)
    : null;
  const Cart = loggedInUser && loggedInUser.sepetim;
  console.log(Cart && Cart);
  const UserId = loggedInUser ? loggedInUser.id : null;

  const totalAmount = useSelector((state) => {
    const updatedCart = state.users.find((user) => user.id === UserId)?.sepetim;
    return updatedCart
      ? updatedCart.reduce((acc, product) => {
          const price =
            product.adet === 1 ? product.fiyat : product.toplamFiyat;
          return acc + price;
        }, 0)
      : 0;
  });

  const handleRemoveFromCart = (product) => {
    UserId &&
      dispatch(removeFromCart(UserId, product)).then(() => {
        dispatch(getUser());
      });
  };
  const handlePaymentConfirm = () =>{
       dispatch(paymentConfirm(UserId,Cart));
      dispatch(resetCart(UserId));
       navigate("/")
  }
  return (
    <div className="bg-white dark:bg-slate-800 text-black dark:text-white">
      <Navigation />
      <div className="min-h-screen">
        <div className="flex flex-wrap justify-center items-center w-full">
          <div className="flex flex-wrap sm:w-[40rem] w-96 bg-gray-100 dark:bg-slate-700 m-2">
            {Cart &&
              Cart.map((c, index) => (
                <div
                  key={index}
                  className="sm:w-56 w-44 sm:m-5 m-2 flex items-center justify-between border dark:border-slate-600 relative"
                >
                  <img
                    src={c.resim}
                    alt="resim"
                    className="sm:w-28 w-22 sm:h-36 h-32"
                  />
                  <div className="mr-1">
                    <p>{c.urunAdi}</p>
                    {c.adet === 1 ? <p>Fiyat:{c.fiyat}₺</p> : <p>Fiyat:{c.toplamFiyat}₺</p>}
                    <p>Adet:{c.adet}</p>
                  </div>
                  <button
                    className="p-1 text-orange-500 dark:text-blue-600 absolute top-0 right-0"
                    onClick={() => handleRemoveFromCart(c)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
          </div>
          <div>
            <form className="w-96 h-56 m-2 p-2 bg-gray-100 dark:bg-slate-700">
              <label className="w-full">Kart Üzerindeki İsim</label> <br />
              <input
                type="text"
                className="dark:bg-slate-800 w-full " required
              />{" "}
              <br />
              <label className="w-full">Kart Numarası</label> <br />
              <input
                className="dark:bg-slate-800 w-full"
                type="text" required
              />{" "}
              <br />
              <div className="w-full flex justify-between">
                <div className="w-[50%]">
                  <label className="w-full">CVV</label> <br />
                  <input
                    className="dark:bg-slate-800 w-[90%]"
                    type="text" required
                  />{" "}
                </div>
                <div className="w-[50%]">
                  <label className="w-full">Son Kullanma Tarihi</label> <br />
                  <select
                    className="dark:bg-slate-800 w-[50%]"
                    name="ay"
                    id="ay" required
                  >
                    <option value="Ocak">Ocak</option>
                    <option value="Şubat">Şubat</option>
                    <option value="Mart">Mart</option>
                    <option value="Nisan">Nisan</option>
                    <option value="Mayıs">Mayıs</option>
                    <option value="Haziran">Haziran</option>
                    <option value="Temmuz">Temmuz</option>
                    <option value="Ağustos">Ağustos</option>
                    <option value="Eylül">Eylül</option>
                    <option value="Ekim">Ekim</option>
                    <option value="Kasım">Kasım</option>
                    <option value="Aralık">Aralık</option>
                  </select>
                  <select
                    className="dark:bg-slate-800 w-[50%]"
                    name="yıl"
                    id="yıl" required
                  >
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
              </div>
            </form>
            <div className="w-96 h-56 m-2 p-2 flex flex-col text-center bg-gray-100 dark:bg-slate-700 relative">
              <p className="text-2xl m-2">Toplam Tutar</p>
              <p className="text-xl m-2">{totalAmount}₺</p>
              <button onClick={() => handlePaymentConfirm()} className="bg-orange-500 dark:bg-blue-600 py-1 text-white rounded absolute bottom-2 w-[90%] m-2 ">Siparişi Onayla</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

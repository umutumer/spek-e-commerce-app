import React, { useEffect } from "react";
import Navigation from "../Components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.isLogin)
    : null;
  const Cart = loggedInUser && loggedInUser.sepetim;
  const totalAmount = Cart
  ? Cart.reduce((acc, product) => {
      const price = product.adet === 1 ? product.fiyat : product.toplamFiyat;
      return acc + price;
    }, 0)
  : 0;
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="bg-white dark:bg-slate-800 w-full min-h-screen dark:text-white">
      <Navigation />
      <div>
        <div className="flex justify-center">
          <table className="sm:w-[50rem] w-[30rem] sm:m-5 m-2 border dark:border-slate-700">
            <thead>
                <tr className="border-b h-10 dark:border-b-slate-700 bg-gray-100 dark:bg-slate-900">
                    <th>Ürün Görseli</th>
                    <th>Ürün Adı</th>
                    <th>Ürün Renk & Marka</th>
                    <th>Ürün Adeti</th>
                    <th>Toplam Fiyat</th>
                </tr>
            </thead>
            <tbody>
                {Cart && Cart.map((product,index) =>(
                    <tr key={index} className="text-center border-b bg-white even:bg-gray-100 dark:bg-slate-800 dark:even:bg-slate-900 dark:border-b-slate-700 " >
                        <td ><img src={product.resim} alt="" className='sm:w-28 w-20 sm:h-40 h-32 sm:m-2 m-1'/></td>
                        <td>{product.urunAdi}</td>
                        {product.renk && <td>{product.renk}</td>}
                        {product.marka && <td>{product.marka}</td>}
                        <td>{product.adet}</td>
                        {product.toplamFiyat ? <td>{product.toplamFiyat}₺</td> : <td>{product.fiyat}₺</td>}
                    </tr>
                ))}
            </tbody>
          </table>
          <div className="sm:m-5 m-2 w-52 border dark:border-slate-700 h-full flex flex-col justify-center items-center">
            <h3 className="w-full text-center dark:bg-slate-900 p-1 text-xl mb-2">Sepet Tutarı</h3>
            <p className="p-1 w-full text-center text-xl mb-2">{totalAmount}₺</p>
            <button className="my-2 p-1 w-[90%] bg-orange-500 dark:bg-blue-600 rounded text-lg text-white ">Sepeti Onayla</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

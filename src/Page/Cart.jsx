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

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="bg-white dark:bg-slate-800 w-full min-h-screen dark:text-white">
      <Navigation />
      <div>
        <div className="flex justify-center">
          <table className="w-[50rem] mt-5 border dark:border-slate-700">
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
                        <td ><img src={product.resim} alt="" className='w-28 h-40 m-2'  /></td>
                        <td>{product.urunAdi}</td>
                        {product.renk && <td>{product.renk}</td>}
                        {product.marka && <td>{product.marka}</td>}
                        <td>{product.adet}</td>
                        {product.toplamFiyat ? <td>{product.toplamFiyat}₺</td> : <td>{product.fiyat}₺</td>}
                    </tr>
                ))}
            </tbody>
          </table>
          <div className="m-5">
            <h3>Toplam Ödenecek Tutar</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

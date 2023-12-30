import React, { useEffect } from "react";
import AdminSideBar from "../Components/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/Action";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const users = Array.isArray(user) ? user : [];
  console.log(users);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <AdminSideBar />
      <div className="md:ml-72 ml-28">
        <table className="border-2 w-full  text-center">
          <thead>
            <tr className="border-b bg-gray-100 text-orange-500 text-center">
              <td>Kullanıcı Adı</td>
              <td>Ürün Resmi</td>
              <td>Ürün Adı</td>
              <td>Ürün Adeti</td>
              <td>Toplam Ücret</td>
              <td>Sipariş Durumu</td>
              <td>Düzenle</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              user.siparislerim.map((order, orderIndex) =>
                order.siparis.ürünler.map((product, productIndex) => (
                  <tr key={`${orderIndex}-${productIndex}`} className="border-b">
                    {productIndex === 0 && (
                      <td rowSpan={order.siparis.ürünler.length}>
                        {user.kullaniciAdi}
                      </td>
                    )}
                    <td>
                      <img
                        src={product.resim}
                        alt={product.urunAdi}
                        className="w-10 h-10 object-cover mx-auto"
                      />
                    </td>
                    <td>{product.urunAdi}</td>
                    <td>{product.adet}</td>
                    {product.toplamFiyat ? <td>{product.toplamFiyat}₺</td>:<td>{product.fiyat}₺</td>}
                    <td>{order.siparis.siparisDurumu}</td>
                    <td><button  className="px-2 py-1 w-20 bg-blue-500 text-white rounded">Düzenle</button></td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;

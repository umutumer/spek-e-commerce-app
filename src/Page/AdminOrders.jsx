import React, { useEffect, useState } from "react";
import AdminSideBar from "../Components/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateOrderStatus } from "../Redux/Action";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const users = Array.isArray(user) ? user : [];
  console.log(users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const handleEditOrder = (userId, orderIndex) => {
    setIsModalOpen(true);
    setSelectedUserId(userId);
    console.log(userId);
    setSelectedOrderIndex(orderIndex);
  };
  const handleUpdateStatus = () => {
    dispatch(updateOrderStatus(selectedUserId, selectedOrderIndex, newStatus));
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="w-full">
      {isModalOpen && (
        <div className="fixed w-full h-screen flex flex-col items-center justify-center bg-black bg-opacity-75 z-40">
          <div className="bg-white w-72 p-2 border flex flex-col items-center rounded shadow-xl">
            <h2 className="text-xl my-4" >Sipariş Durumu</h2>
            <select
            className="my-2"
              name=""
              id=""
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Beklemede">Beklemede</option>
              <option value="Onaylandı">Onaylandı</option>
              <option value="Kargoda">Kargoda</option>
              <option value="Teslim Edildi">Teslim Edildi</option>
              <option value="İade Edildi">İade Edildi</option>
            </select>
            <div className="flex mt-4 mb-1">
              <button className="px-2 py-1 w-32 m-2 bg-blue-500 text-white rounded" onClick={handleUpdateStatus}>Kaydet</button>
              <button className="px-2 py-1 w-32 m-2 bg-red-600 text-white rounded" onClick={() => setIsModalOpen(false)}>İptal</button>
            </div>
          </div>
        </div>
      )}
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
            user.siparislerim.map((order, orderIndex) => (
              order.map((orderItem, orderItemIndex) => (
                <tr key={`${orderIndex}-${orderItemIndex}`} className="border-b">
                  <td>{user.kullaniciAdi}</td>
                  <td>
                    <img
                      src={orderItem.siparis.ürünler[orderIndex].resim}
                      alt={orderItem.siparis.ürünler[orderIndex].urunAdi}
                      className="w-10 h-10 object-cover mx-auto"
                    />
                  </td>
                  <td>{orderItem.siparis.ürünler[orderIndex].urunAdi}</td>
                  <td>{orderItem.siparis.ürünler[orderIndex].adet}</td>
                  <td>{orderItem.siparis.ürünler[orderIndex].toplamFiyat ? orderItem.siparis.ürünler[orderIndex].toplamFiyat :orderItem.siparis.ürünler[orderIndex].fiyat }₺</td>
                  <td>{orderItem.siparis.siparisDurumu}</td>
                  {console.log(user.siparislerim)}
                  <td>
                    <button
                      onClick={() => handleEditOrder(user.id, orderIndex)}
                      className="px-2 py-1 w-20 bg-blue-500 text-white rounded"
                    >
                      Düzenle
                    </button>
                  </td>
                </tr>
              ))
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminOrders;

import React, { useEffect, useState } from "react";
import AdminSideBar from "../Components/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../Redux/Action";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const users = Array.isArray(user) ? user : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const handleOpenModal = (userId, status) => {
    setStatus(status);
    setUserId(userId);
    setIsModalOpen(!isModalOpen);
  };
console.log(status);
  const handleUpdateUser = () => {
    const newUser = status;
    dispatch(updateUser(userId, newUser))
      .then(() => dispatch(getUser()))
      .then(() => setIsModalOpen(!isModalOpen));
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="w-full">
      <AdminSideBar />
      {isModalOpen && (
        <div className="fixed top-0 w-full h-screen bg-black bg-opacity-75 flex items-center justify-center">
          <div className="w-72 flex flex-col items-center border-2 shadow-xl bg-gray-100">
            <h3 className="my-4">Statü'yü Güncelle</h3>
            <select
              name=""
              id=""
              className="my-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
               <option value="Admin">Admin</option>
              <option value="Uye">Uye</option>
            </select>
            <div className="w-full flex justify-center mb-1">
              <button onClick={() => handleUpdateUser()} className="px-2 py-1 w-32 m-2 bg-blue-500 text-white rounded">
                Onayla
              </button>
              <button
                className="px-2 py-1 w-32 m-2 bg-red-600 text-white rounded"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="md:ml-72 ml-28">
        <table className="border-2 w-full  text-center">
          <thead>
            <tr className="bg-gray-100">
              <th>İd</th>
              <th>Kullanıcı Adı</th>
              <th>E-posta</th>
              <th>Status</th>
              <th>Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td>{user.id}</td>
                  <td>{user.kullaniciAdi}</td>
                  <td>{user.mail}</td>
                  <td>{user.status}</td>
                  <td>
                    <button
                      className="px-2 py-1 my-1 bg-blue-500 text-white rounded"
                      onClick={() => handleOpenModal(user.id, user.status)}
                    >
                      Düzenle
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

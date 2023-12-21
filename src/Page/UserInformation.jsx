import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Components/Navigation";
import { getUser } from "../Redux/Action";
import { FaCircleUser } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const UserInformation = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.isLogin)
    : null;

  const [modalVisibilty, setModalVisibility] = useState(false);

  const handleClickModal = () => {
    setModalVisibility(!modalVisibilty);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  if (!loggedInUser) {
    return (
      <div className="w-full flex flex-col relative">
        <Navigation />
        <div>
          <div>Kullanıcı Bulunamadı</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col relative min-h-screen bg-white dark:bg-slate-800 dark:text-white">
        <Navigation />
        <div className=" flex items-center justify-center w-full h-full mt-5 ">
          <div className="flex flex-col sm:w-[30rem] w-96 items-center justify-center  sm:h-[30rem] h-full border dark:bg-slate-800 dark:border-slate-600 relative ">
            <div className="sm:w-32 w-full m-5 flex justify-center">
              <FaCircleUser className="text-orange-500 dark:text-blue-600 text-9xl" />
            </div>
            <div className="sm:w-72 w-full m-5 flex flex-col justify-center items-start">
              <p className="text-xl mb-1">
                <span className="text-orange-500 dark:text-blue-600">
                  Kullanıcı Adı:{" "}
                </span>
                {loggedInUser.kullaniciAdi}
              </p>
              <p className="text-xl mb-1">
                <span className="text-orange-500 dark:text-blue-600">
                  E-Posta:{" "}
                </span>
                {loggedInUser.mail}
              </p>
              {loggedInUser.telno ? (
                <p className="text-xl mb-1">
                  <span className="text-orange-500 dark:text-blue-600">
                    Telefon Numarası:{" "}
                  </span>
                  {loggedInUser.telNo}
                </p>
              ) : (
                <p className="text-xl mb-1">
                  <span className="text-orange-500 dark:text-blue-600">
                    Telefon Numarası:{" "}
                  </span>
                  Eklenmedi
                </p>
              )}
              {loggedInUser.adres ? (
                <p className="text-xl mb-1">
                  <span className="text-orange-500 dark:text-blue-600">
                    Adres:{" "}
                  </span>
                  {loggedInUser.adres}
                </p>
              ) : (
                <p className="text-xl mb-1">
                  <span className="text-orange-500 dark:text-blue-600">
                    Adres:{" "}
                  </span>{" "}
                  Eklenmedi
                </p>
              )}
              <button
                onClick={() => handleClickModal()}
                className="text-orange-500 dark:text-blue-600 flex items-center absolute top-2 right-2"
              >
                Bilgileri Düzenle <FaEdit className="ml-1" />
              </button>
            </div>
          </div>
        </div>
        {modalVisibilty === true && (
              <div className="w-full h-full bg-black bg-opacity-70 absolute  flex items-center justify-center">
                <div className="relative">
                <form className="top-30 sm:w-[40rem] w-96 border p-3 z-20 bg-white dark:bg-slate-800 flex flex-col justify-center relative">
                  <label>Kullanıcı Adı</label>
                  <input type="text" value={loggedInUser.kullaniciAdi} className="dark:bg-slate-700 focus:outline-none focus:border-1 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600" /> <br />
                  <label >E-Posta</label>
                  <input type="text" value={loggedInUser.mail} className="dark:bg-slate-700 focus:outline-none focus:border-1 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600" /> <br />
                  <label>Telefon Numarası</label>
                  {loggedInUser.telNo ? (
                    <input type="number" value={loggedInUser.telNo} className="dark:bg-slate-700 focus:outline-none focus:border-1 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600" />
                  ):(
                    <input type="number" className="dark:bg-slate-700 focus:outline-none focus:border-1 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600"  /> 
                  )} <br />
                  <label>Adres</label>
                  {loggedInUser.adres ?(
                    <input type="text" value={loggedInUser.adres} className="dark:bg-slate-700 focus:outline-none focus:border-1 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600" />
                  ):(
                    <input type="text" className="dark:bg-slate-700 focus:outline-none focus:border-1 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600" />
                  )} <br />
                  <input type="submit" value={'Güncelle'} className="bg-orange-500 dark:bg-blue-600 text-white p-2" />
                </form>
                <button onClick={() => handleClickModal()} className="absolute top-1 right-1 text-xl font-bold text-orange-500 dark:text-blue-600 z-50">X</button>
                </div>
                
              </div>
            )}
      </div>
    );
  }
};

export default UserInformation;

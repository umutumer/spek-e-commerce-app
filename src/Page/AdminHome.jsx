import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/Action";
import AdminSideBar from "../Components/AdminSideBar";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.isLogin)
    : null;
  const admin = loggedInUser && loggedInUser.status === "Admin";

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  if (!admin) {
    return <div className="w-full h-screen flex justify-center items-center"><p className="text-3xl  text-red-600">Bu Sayfaya Erişim İzniniz Yok !</p></div>;
  } else if (!loggedInUser) {
    return <div className="w-full h-screen flex justify-center items-center"><p className="text-3xl  text-red-600">Bu Sayfaya Erişim İzniniz Yok !</p></div>;
  } else if (admin) {
    return (
      <div>
        <AdminSideBar />
        <div className=" md:ml-72 ml-32 duration-300 min-h-screen flex flex-col items-center justify-center">
          <div className="w-full flex  items-center justify-center">
            <Link to='/admin/product' className="md:w-[30rem] w-[14rem] mx-2.5 my-5 h-60 relative rounded-md">
              <img
                src="https://roketfy.com/tr/data/uploads/sites/2/2022/11/blog4.jpg"
                className="w-full h-full object-cover rounded-md"
                alt=""
              />
              <p className="w-full h-full absolute top-0 text-2xl font-bold text-white bg-black opacity-70  flex items-center justify-center rounded-md">
                ÜRÜNLER
              </p>
            </Link>
            <Link to='/admin/users' className="md:w-[30rem] w-[14rem] mx-2.5 my-5 h-60  relative rounded-md">
              <img
                src="https://static.prod01.ue1.p.pcomm.net/blackbaud/user_content/photos/000/006/6783/a6132a5cd55abcae190bc82567ca8a47-original-users.png"
                className="w-full h-full object-cover rounded-md"
                alt=""
              />
              <p className="w-full h-full absolute top-0 text-2xl font-bold text-white bg-black opacity-70  flex items-center justify-center rounded-md">
                KULLANICILAR
              </p>
            </Link>
          </div>
          <Link to='/admin/orders' className="md:w-[61.2rem] w-[29.3rem] mx-2.5 h-60 bg-gray-100 flex  items-center justify-center relative rounded-md">
            <img
              src="https://m.economictimes.com/thumb/msid-74440369,width-1200,height-900,resizemode-4,imgsize-665048/online-order_istock.jpg"
              className="w-full h-full object-cover rounded-md"
              alt=""
            />
            <p className="w-full h-full absolute top-0 text-2xl font-bold text-white bg-black opacity-70  flex items-center justify-center rounded-md">
              SİPARİŞLER
            </p>
          </Link>
        </div>
      </div>
    );
  }
};

export default AdminHome;

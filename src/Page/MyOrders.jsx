import React from "react";
import Navigation from "../Components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.isLogin)
    : null;
    const myOrderList = loggedInUser && loggedInUser.siparislerim;
    console.log(myOrderList && myOrderList);
    const orders = Array.isArray(myOrderList) ? myOrderList.filter((order) => order.siparis):null
    console.log(orders && orders); 
    console.log(orders && orders.ürünler);
  return (
    <div className="bg-white text-black dark:bg-slate-800 dark:text-white min-h-screen">
      <Navigation />
      <div>
        <div> {orders && orders.map((order,index) =>(
            <div key={index}>
                <img src={order.siparis.ürünler.resim} alt="" />
            </div>
        ))} </div>
        <p> {} </p>
      </div>
    </div>
  );
};

export default MyOrders;

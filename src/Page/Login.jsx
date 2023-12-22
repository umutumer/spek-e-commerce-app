import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, login } from "../Redux/Action";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(username, password))
    .then(() => {
      dispatch(getUser());
    });
    navigate('/');
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white dark:bg-slate-900">
      <form className="w-96 h-96 flex flex-col items-center justify-center border border-orange-500 dark:border-blue-600 shadow-lg shadow-orange-400 dark:shadow-blue-600 rounded relative">
        <h3 className="m-2 text-2xl font-medium text-orange-500 dark:text-blue-600">
          SPEK E COMMERCE GİRİŞ YAP
        </h3>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="kullanıcı adı"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="******"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
        />
        <input
          onClick={handleLogin}
          type="submit"
          value={"Giriş Yap"}
          className="w-[90%] m-2 p-2 rounded text-white bg-orange-500 dark:bg-blue-600"
        />
        <div className="absolute bottom-2 right-2 flex">
          <p className="mr-2 text-gray-400">Hesabınız mı yok ?</p>{" "}
          <Link
            to="/register"
            className="text-black dark:text-white border-b border-black dark:border-white"
          >
            Kayıt Olun
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

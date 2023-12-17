import React from "react";

const Register = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white dark:bg-slate-900">
      <form className="w-96 h-96 flex flex-col items-center justify-center border border-orange-500 dark:border-blue-600 shadow-lg shadow-orange-400 dark:shadow-blue-600 rounded relative">
        <h3 className="m-2 text-2xl font-medium text-orange-500 dark:text-blue-600">
          SPEK E COMMERCE KAYIT OL
        </h3>
        <input
          type="text"
          placeholder="kullanıcı adı"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
        />
        <input
          type="text"
          placeholder="e-posta"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
        />
        <input
          type="password"
          placeholder="şifre"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
        />
        <input
          type="password"
          placeholder="şifre tekrar"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
        />
        <input
          type="submit"
          value={"Kayıt Ol"}
          className="w-[90%] m-2 p-2 rounded text-white bg-orange-500 dark:bg-blue-600"
        />
      </form>
    </div>
  );
};

export default Register;

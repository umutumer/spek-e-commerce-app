import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../Redux/Action";
import { setUserField } from "../Redux/UserSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const kullaniciAdiRef = useRef();
  const mailRef = useRef();
  const telNoRef = useRef();
  const adresRef = useRef();
  const sifreRef = useRef();
  const sifreTekrarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const kullaniciAdi = kullaniciAdiRef.current.value;
    const mail = mailRef.current.value;
    const telNo = parseFloat(telNoRef.current.value);
    const adres = adresRef.current.value;
    const sifre = sifreRef.current.value;
    const sifreTekrar = sifreTekrarRef.current.value;
    const sepetim = [];
    const favoriler = [];
    const siparislerim = [];
    const status = "Uye"
    const isLogin = false
    

    if (sifre === sifreTekrar) {
      dispatch(setUserField({ field: "kullaniciAdi", value: kullaniciAdi }));
      dispatch(setUserField({ field: "mail", value: mail }));
      dispatch(setUserField({ field: "sepetim", value: sepetim }));
      dispatch(setUserField({ field: "favoriler", value: favoriler }));
      dispatch(setUserField({ field: "siparislerim", value: siparislerim }));
      dispatch(setUserField({ field: "telNo", value: telNo }));
      dispatch(setUserField({ field: "adres", value: adres }));
      dispatch(setUserField({ field: "sifre", value: sifre }));
      dispatch(setUserField({ field: "status", value: status }));
      dispatch(setUserField({ field: "isLogin", value: isLogin }));
      dispatch(registerUser(kullaniciAdi, mail, sepetim, favoriler,siparislerim, telNo, adres, sifre,status,isLogin));
      navigate("/login");
      
    } else {
      const passError = () => {
        alert("Şifreler aynı değil!");
      };
      setTimeout(passError, 1000);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white dark:bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-96 flex flex-col items-center justify-center border border-orange-500 dark:border-blue-600 shadow-lg shadow-orange-400 dark:shadow-blue-600 rounded relative"
      >
        <h3 className="m-2 text-2xl font-medium text-orange-500 dark:text-blue-600">
          SPEK E COMMERCE KAYIT OL
        </h3>
        <input
          ref={kullaniciAdiRef}
          type="text"
          placeholder="kullanıcı adı"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
          required
        />
        <input
          ref={mailRef}
          type="email"
          placeholder="e-posta"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
          required
        />
        <input
          ref={telNoRef}
          type="text"
          placeholder="Telefon Numarası"
          maxLength={10}
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
          required
        />
        <input
          ref={adresRef}
          type="text"
          placeholder="Adres"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
          required
        />
        <input
          ref={sifreRef}
          type="password"
          placeholder="şifre"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
          required
        />
        <input
          ref={sifreTekrarRef}
          type="password"
          placeholder="şifre tekrar"
          className="w-[90%] m-2 p-2 rounded border border-orange-500 dark:border-blue-600 focus:outline-none focus:border-2 focus:border-orange-500 dark:focus:border-blue-600 focus:ring-orange-500 dark:focus:ring-blue-600 bg-white text-black dark:bg-slate-800 dark:text-white"
          required
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

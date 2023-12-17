import axios from "axios";
import { setProduct } from "./ProductSlice";
import { delUser, setUser, setUserField, upUser } from "./UserSlice";

//Product
const getProduct = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3005/product");
    dispatch(setProduct(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

//User
const getUser = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3005/users");
    dispatch(setUser(response.data));
  } catch (error) {
    console.error("Kullanıcılar gelirken hata oluştu:", error);
  }
};
const updateUser = (userId, newUser) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:3005/users/${userId}`,
      newUser
    );
    dispatch(upUser(response.data));
  } catch (error) {
    console.error("Kullanıcı bilgileri güncellenirken hata oluştu:", error);
  }
};
const registerUser = (kullaniciAdi, mail, sifre) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3005/users", {
      kullaniciAdi,
      mail,
      sifre,
    });
    console.log(response);
    dispatch(setUserField({ field: "kullaniciAdi", value: kullaniciAdi }));
    dispatch(setUserField({ field: "mail", value: mail }));
    dispatch(setUserField({ field: "sifre", value: sifre }));
  } catch (error) {
    console.error("Kayıt edilirken hata oluştu:", error);
  }
};
const deleteUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `http://localhost:3005/users/${userId}`
    );
    dispatch(delUser(response.data));
  } catch (error) {
    console.error("Kullanıcı silinirken hata oluştu:", error);
  }
};
export { getProduct, registerUser, getUser, updateUser, deleteUser };

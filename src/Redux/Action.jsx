import axios from "axios";
import { setProduct } from "./ProductSlice";
import {
  delUser,
  loginUser,
  logoutUser,
  setUser,
  setUserField,
  upUser,
} from "./UserSlice";
import { addCart } from "./CartSlice";

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
const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/users?kullaniciAdi=${username}&sifre=${password}`
    );

    if (response.data.length > 0) {
      const userId = response.data[0].id;

      await axios.patch(`http://localhost:3005/users/${userId}`, {
        isLogin: true,
      });

      dispatch(loginUser({ userId }));
    } else {
      console.error("Kullanıcı adı veya şifre yanlış.");
    }
  } catch (error) {
    console.error("Bir hata oluştu:", error.message);
  }
};
const logout = (userId) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `http://localhost:3005/users/${userId}`,
      { isLogin: false }
    );
    console.log(response.data);
    dispatch(logoutUser({ userId }));
  } catch (error) {
    console.error("Bir hata oluştu:", error.message);
  }
};

//Cart

const addToCart = (userId, product) => async (dispatch) => {
  try {
    const userResponse = await axios.get(`http://localhost:3005/users/${userId}`);
    const currentUser = userResponse.data;
    const existingProduct = currentUser.sepetim.find((item) => item.id === product.id)
    let updateCart;
    if (existingProduct) {
      updateCart = {
        sepetim: currentUser.sepetim.map((item) =>
        item.id === product.id ? {...item,adet:item.adet +1 ,toplamFiyat: item.fiyat*item.adet +item.fiyat}:item
        )
      }
    } else {
      updateCart = {
        sepetim:[...currentUser.sepetim,{...product,adet:1}]
      }
    }
    const response = await axios.patch(
      `http://localhost:3005/users/${userId}`,
      updateCart
    );
    console.log(response.data);
    dispatch(addCart(updateCart));
  } catch (error) {
    console.error("Bir hata oluştu:", error.message);
  }
};
const quantityPlus = (userId,product) => async (dispatch) => {
  try{
    const userResponse = await axios.get(`http://localhost:3005/users/${userId}`);
    const currentUser = userResponse.data;
    const existingProduct = currentUser.sepetim.find((item) => item.id === product.id)
    let quantityPlus;
    if (existingProduct) {
      quantityPlus = {
        sepetim: currentUser.sepetim.map((item) =>
        item.id === product.id ? {...item,adet:item.adet +1,toplamFiyat:item.fiyat*item.adet + item.fiyat}:item
        )
      }
    }
    const response = await axios.patch(
      `http://localhost:3005/users/${userId}`,
      quantityPlus
    );
    console.log(response.data);
    dispatch(addCart(quantityPlus));
  } catch (error) {
    console.error("Bir hata oluştu:", error.message);
  }
}
const quantityMinus = (userId, product) => async (dispatch) => {
  try {
    const userResponse = await axios.get(`http://localhost:3005/users/${userId}`);
    const currentUser = userResponse.data;
    const existingProduct = currentUser.sepetim.find((item) => item.id === product.id);

    let quantityMinus;
    if (existingProduct && existingProduct.adet > 1) {
      quantityMinus = {
        sepetim: currentUser.sepetim.map((item) =>
          item.id === product.id
            ? { ...item, adet: item.adet - 1, toplamFiyat: item.fiyat * (item.adet - 1) }
            : item
        ),
      };
    }

    const response = await axios.patch(`http://localhost:3005/users/${userId}`, quantityMinus);
    console.log(response.data);
    dispatch(addCart(quantityMinus));
  } catch (error) {
    console.error("Bir hata oluştu:", error.message);
  }
};


export {
  getProduct,
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  login,
  logout,
  addToCart,
  quantityPlus,
  quantityMinus,
};

import axios from "axios";
import { delProduct, setProduct, setProductField, upProduct } from "./ProductSlice";
import {
  delUser,
  loginUser,
  logoutUser,
  setUser,
  setUserField,
  upUser,
} from "./UserSlice";
import { addCart, removeCart, resCart } from "./CartSlice";
import { addFavorite, delFavorite } from "./FavoriteSlice";
import { addOrder } from "./OrderSlice";

//Product
const getProduct = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3005/product");
    dispatch(setProduct(response.data));
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const updateProduct = ({productId, newProduct}) => async (dispatch) => {
  try{
    const response = await axios.patch(`http://localhost:3005/product/${productId}` , newProduct);
    dispatch(upProduct(response.data));
  }catch (error) {
    console.error("Ürün bilgileri güncellenirken hata oluştu:", error);
  }
};
const deleteProduct = (productId) => async (dispatch) =>{
  try{
    const response = await axios.delete(`http://localhost:3005/product/${productId}`);
    dispatch(delProduct(response.data));
  }catch (error) {
    console.error("Ürün silinirken hata oluştu:", error);
  }
};
const createProduct = (urunAdi,fiyat,renk,kategori,resim,urunaciklama,marka) => async (dispatch) =>{
  try{
    const response = await axios.post("http://localhost:3005/product",{
      urunAdi,
      fiyat,
      renk,
      kategori,
      resim,
      urunaciklama,
      marka,
    });
    dispatch(setProductField({field:urunAdi, value:urunAdi}))
    dispatch(setProductField({field:fiyat, value:fiyat}))
    dispatch(setProductField({field:renk, value:renk}))
    dispatch(setProductField({field:kategori, value:kategori}))
    dispatch(setProductField({field:resim, value:resim}))
    dispatch(setProductField({field:urunaciklama, value:urunaciklama}))
    dispatch(setProductField({field:marka, value:marka}))
  } catch (error) {
    console.error("Ürün eklenirken hata oluştu:", error);
  }
}
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
    const response = await axios.patch(
      `http://localhost:3005/users/${userId}`,
      newUser
    );
    dispatch(upUser(response.data));
  } catch (error) {
    console.error("Kullanıcı bilgileri güncellenirken hata oluştu:", error);
  }
};
const registerUser =
  (kullaniciAdi, mail, sepetim, favoriler, siparislerim , telNo, adres, sifre,status,isLogin) =>
  async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3005/users", {
        kullaniciAdi,
        mail,
        sepetim,
        favoriler,
        siparislerim,
        telNo,
        adres,
        sifre,
        status,
        isLogin,
      });
      console.log(response);
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
    const userResponse = await axios.get(
      `http://localhost:3005/users/${userId}`
    );
    const currentUser = userResponse.data;
    const existingProduct = currentUser.sepetim.find(
      (item) => item.id === product.id
    );
    let updateCart;
    if (existingProduct) {
      updateCart = {
        sepetim: currentUser.sepetim.map((item) =>
          item.id === product.id
            ? {
                ...item,
                adet: item.adet + 1,
                toplamFiyat: item.fiyat * item.adet + item.fiyat,
              }
            : item
        ),
      };
    } else {
      updateCart = {
        sepetim: [...currentUser.sepetim, { ...product, adet: 1 }],
      };
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
const quantityPlus = (userId, product) => async (dispatch) => {
  try {
    const userResponse = await axios.get(
      `http://localhost:3005/users/${userId}`
    );
    const currentUser = userResponse.data;
    const existingProduct = currentUser.sepetim.find(
      (item) => item.id === product.id
    );
    let quantityPlus;
    if (existingProduct) {
      quantityPlus = {
        sepetim: currentUser.sepetim.map((item) =>
          item.id === product.id
            ? {
                ...item,
                adet: item.adet + 1,
                toplamFiyat: item.fiyat * item.adet + item.fiyat,
              }
            : item
        ),
      };
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
};
const quantityMinus = (userId, product) => async (dispatch) => {
  try {
    const userResponse = await axios.get(
      `http://localhost:3005/users/${userId}`
    );
    const currentUser = userResponse.data;
    const existingProduct = currentUser.sepetim.find(
      (item) => item.id === product.id
    );

    let quantityMinus;
    if (existingProduct && existingProduct.adet > 1) {
      quantityMinus = {
        sepetim: currentUser.sepetim.map((item) =>
          item.id === product.id
            ? {
                ...item,
                adet: item.adet - 1,
                toplamFiyat: item.fiyat * (item.adet - 1),
              }
            : item
        ),
      };
    }

    const response = await axios.patch(
      `http://localhost:3005/users/${userId}`,
      quantityMinus
    );
    console.log(response.data);
    dispatch(addCart(quantityMinus));
  } catch (error) {
    console.error("Bir hata oluştu:", error.message);
  }
};

const removeFromCart = (userId, product) => async (dispatch) => {
  try {
    const userResponse = await axios.get(
      `http://localhost:3005/users/${userId}`
    );
    const currentUser = userResponse.data;
    const removeProduct = currentUser.sepetim.filter(
      (item) => item.id !== product.id
    );

    const response = await axios.patch(
      `http://localhost:3005/users/${userId}`,
      { sepetim: removeProduct }
    );
    dispatch(removeCart(response.data));
  } catch (error) {
    console.error("Ürün Sepetten silinirken hata oluştu", error);
  }
};
const resetCart = (UserId) => async (dispatch) =>{
  try{
    const response = await axios.patch(
      `http://localhost:3005/users/${UserId}`,{ sepetim: [] }
    );
    dispatch(resCart(response.data));
    console.log(response.data);
  } catch(error){
    console.error("sepet sıfırlanırken hata oluştu",error);
  }
}

// Favorites

const addFavorites = (userId, product) => async (dispatch) => {
  const userResponse = await axios.get(`http://localhost:3005/users/${userId}`);
  const currentUser = userResponse.data;
  let updateFavorite;
  if (currentUser) {
    updateFavorite = {
      favoriler: [...currentUser.favoriler, { ...product }],
    };
  }
  const response = await axios.patch(
    `http://localhost:3005/users/${userId}`,
    updateFavorite
  );
  dispatch(addFavorite(response.data));
};

const deleteFavorites = (UserId, product) => async (dispatch) => {
  const userResponse = await axios.get(`http://localhost:3005/users/${UserId}`);
  const currentUser = userResponse.data;
  const updatedFavorites = currentUser.favoriler.filter(
    (item) => item.id !== product.id
  );
  console.log(product);

  const response = await axios.patch(`http://localhost:3005/users/${UserId}`, {
    favoriler: updatedFavorites,
  });

  dispatch(delFavorite(response.data));
};

//Payment 

const paymentConfirm = (UserId,Cart) => async (dispatch) =>{
  try{
    const userResponse = await axios.get(`http://localhost:3005/users/${UserId}`);
    const currentUser = userResponse.data;
    let addOrderr;
    if (currentUser) {
      addOrderr = {
        siparislerim: [...currentUser.siparislerim,{siparis:{ürünler:Cart ,siparisDurumu: 'Beklemede'}}],
        
      }
    }
    const response = await axios.patch(`http://localhost:3005/users/${UserId}` , addOrderr);
    dispatch(addOrder(response.data));
  } catch(error){
    console.error("sipariş verilirken bir hata oluştu",error);
  }
}

export {
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  login,
  logout,
  addToCart,
  quantityPlus,
  quantityMinus,
  removeFromCart,
  resetCart,
  addFavorites,
  deleteFavorites,
  paymentConfirm,
};

import React, { useEffect, useState } from "react";
import AdminSideBar from "../Components/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, getProduct, getUser, updateProduct } from "../Redux/Action";
import { toast } from "react-toastify";

const AdminProduct = () => {
  const product = useSelector((state) => state.product);
  const products = Array.isArray(product) ? product : [];
  console.log(products);
  const dispatch = useDispatch();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState({
    urunAdi: "",
    resim: "",
    fiyat: "",
    marka: "",
    renk: "",
    urunaciklama: "",
  });
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedData(products[index]);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedData({
      urunAdi: "",
      resim: "",
      fiyat: "",
      marka: "",
      renk: "",
      urunaciklama: "",
    });
  };
  const handleUpdateData = async () => {
    try {
      if (editingIndex !== null && editingIndex !== undefined) {
        await dispatch(
          updateProduct({
            productId: products[editingIndex].id,
            newProduct: editedData,
          })
        ).then(() => {
          toast.success("Ürün Başarıyla Güncellendi!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(getProduct());
        });
      } else {
        console.error("Hata: Geçerli bir ürün seçilmemiş.");
      }
    } catch (error) {
      console.error("Veri güncellenirken hata oluştu:", error);
    } finally {
      handleCancelEdit();
    }
  };
  const handleDeleteClick = async (productId) => {
    try {
      if (productId) {
        await dispatch(deleteProduct(productId));
        dispatch(getProduct());
        toast.warn("Ürün Silindi!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.error("silinecek verinin kimliği belirtilmemiş");
      }
    } catch (error) {
      console.error("Veri silinirken hata oluştu:", error.payload);
    }
  };

  const [createModal, setCreateModal] = useState(false);
  const [newData, setNewData] = useState({
    urunAdi: "",
    fiyat: "",
    renk: "",
    kategori: "",
    resim: "",
    urunaciklama: "",
    marka: "",
  });
  const handleCreateModalOpen = () => {
    setCreateModal(!createModal);
  };
  const handleCreateModalClose = () => {
    setCreateModal(!createModal);
  };

  const handleCreateProduct = async () =>{
    await dispatch(createProduct({
        newProduct: newData,
    })).then(() => getUser()).finally(() => handleCreateModalClose())
  }

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <div className="flex w-full">
      <AdminSideBar />
      <div className="md:ml-72 ml-28 w-full relative">
        {editingIndex !== null && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-30">
            <div className="bg-gray-200 w-80 flex flex-col items-center justify-center rounded shadow-lg shadow-black text-black">
              <h3>Ürün Adı:</h3>
              <input
                type="text"
                value={editedData.urunAdi}
                onChange={(e) =>
                  setEditedData({ ...editedData, urunAdi: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Resmi:</h3>
              <input
                type="text"
                value={editedData.resim}
                onChange={(e) =>
                  setEditedData({ ...editedData, resim: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Markası:</h3>
              <input
                type="text"
                value={editedData.marka}
                onChange={(e) =>
                  setEditedData({ ...editedData, marka: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Rengi:</h3>
              <input
                type="text"
                value={editedData.renk}
                onChange={(e) =>
                  setEditedData({ ...editedData, renk: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Açıklaması:</h3>
              <input
                type="text"
                value={editedData.urunaciklama}
                onChange={(e) =>
                  setEditedData({ ...editedData, urunaciklama: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Fiyatı:</h3>
              <input
                type="number"
                value={editedData.fiyat}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    fiyat: parseFloat(e.target.value),
                  })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <div className="my-4">
                <button
                  onClick={() => handleUpdateData()}
                  className="mr-2 bg-green-500 w-20 p-2 rounded text-white"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => handleCancelEdit()}
                  className="bg-red-600 w-20  p-2 rounded text-white"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}
        {createModal !== false && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-30">
            <div className="bg-gray-200 w-80 flex flex-col items-center justify-center rounded shadow-lg shadow-black text-black">
              <h3>Ürün Adı:</h3>
              <input
                type="text"
                onChange={(e) =>
                  setNewData({urunAdi: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Resmi:</h3>
              <input
                type="text"
                onChange={(e) =>
                  setNewData({ ...editedData, resim: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Markası:</h3>
              <input
                type="text"
                onChange={(e) =>
                  setNewData({ ...editedData, marka: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Rengi:</h3>
              <input
                type="text"
                onChange={(e) =>
                  setNewData({ ...editedData, renk: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Açıklaması:</h3>
              <input
                type="text"
                onChange={(e) =>
                  setNewData({ ...editedData, urunaciklama: e.target.value })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <h3>Ürün Fiyatı:</h3>
              <input
                type="number"
                onChange={(e) =>
                  setNewData({
                    ...editedData,
                    fiyat: parseFloat(e.target.value),
                  })
                }
                className="bg-gray-100 p-2 rounded-md w-[90%]"
              />
              <div className="my-4">
                <button
                  onClick={() => handleCreateProduct()}
                  className="mr-2 bg-green-500 w-20 p-2 rounded text-white"
                >
                  Ekle
                </button>
                <button
                  onClick={() => handleCreateModalClose()}
                  className="bg-red-600 w-20  p-2 rounded text-white"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="my-5 w-full  h-10 relative">
          <button
            onClick={() => handleCreateModalOpen()}
            className="absolute top-2 right-3 px-2 py-1 bg-orange-500 text-white rounded"
          >
            + Yeni Ürün
          </button>
        </div>
        <table className="border-2 md:w-full w-[10rem]">
          <thead>
            <tr className="border-b bg-gray-100 text-orange-500 text-center">
              <th>ID</th>
              <th>Resim</th>
              <th>Ürün Adı</th>
              <th>Fiyat</th>
              <th>Marka & Renk</th>
              <th>Ürün Açıklaması</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b even:bg-gray-100 text-center"
                >
                  <td>{product.id}</td>
                  <td>
                    <img src={product.resim} alt="" className="w-28" />
                  </td>
                  <td>{product.urunAdi}₺</td>
                  <td>{product.fiyat}₺</td>
                  <td>
                    {product.marka} & {product.renk}
                  </td>
                  <td>
                    {product.urunaciklama &&
                      product.urunaciklama.substring(0, 30) + "..."}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditClick(index)}
                      className="px-2 py-1 w-20 bg-blue-500 text-white rounded m-1"
                    >
                      Düzenle
                    </button>{" "}
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="px-2 py-1 w-20 bg-red-500 text-white rounded m-1"
                    >
                      Sil
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

export default AdminProduct;

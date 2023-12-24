import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Components/Navigation';
import { Link } from 'react-router-dom';
import { addFavorites, addToCart, deleteFavorites, getUser } from '../Redux/Action';
import { toast } from 'react-toastify';
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Favorites = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const loggedInUser = Array.isArray(users)
      ? users.find((user) => user.isLogin)
      : null;
    const Favorites = loggedInUser && loggedInUser.favoriler;
    const UserId = loggedInUser ? loggedInUser.id : null;

    const handleAddToCart = (product) => {
        if (UserId) {
          dispatch(addToCart(UserId, product));
          toast.success("Sepete Eklendi!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      };

      const handleAddToFavorite = (product) => {
        if (UserId) {
          dispatch(addFavorites(UserId, product)).then(() => {
            dispatch(getUser());
          });
        }
      };
      const handleDeleteToFavorite = (product) => {
        if (UserId) {
          dispatch(deleteFavorites(UserId, product)).then(() => {
            dispatch(getUser());
          });
        }
      };
  
  return (
    <div className=' bg-white dark:bg-slate-800 dark:text-white'>
        <Navigation />
        <h3 className='text-center mt-5 text-2xl font-semibold' >Favorilerim</h3>
        <div className="w-full flex flex-wrap justify-center bg-white dark:bg-slate-800 dark:text-white min-h-screen">
        {Favorites.map((favorite,index) =>(
            <div className=" md:w-52 w-40 md:h-96 border bg-white dark:bg-slate-900 dark:border-slate-600 m-5 relative" key={index}>
                <Link to={`/details/${favorite.id}`}>
              <img src={favorite.resim} alt="" className=" w-full md:h-72 h-60" />
              <p className="m-0.5">{favorite.urunAdi}</p>
              <p className="m-0.5">{favorite.fiyat}₺</p>
            </Link>
            <div className="w-full flex justify-center">
              <button
                onClick={() => handleAddToCart(favorite)}
                className="bg-orange-500 text-white w-48 h-7 rounded-xl m-0.5 dark:bg-blue-600"
              >
                Sepete Ekle
              </button>
            </div>
            <div>
            {Favorites && Favorites.length > 0 ? (
                Favorites.map((fav, index) => (
                  <div key={index} className="absolute top-2 right-2">
                    {fav.id === favorite.id ? (
                      <button onClick={() => handleDeleteToFavorite(favorite)}>
                        <FaHeart className="text-orange-500 dark:text-blue-500 text-xl z-30" />
                      </button>
                    ) : (
                      <button onClick={() => handleAddToFavorite(favorite)}>
                        <FaRegHeart className="text-orange-500 dark:text-blue-500 text-xl z-30" />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="absolute top-2 right-2">
                  <button onClick={() => handleAddToFavorite(favorite)}>
                    <FaRegHeart className="text-orange-500 dark:text-blue-500 text-xl z-30" />
                  </button>
                </div>
              )}
            </div>
            </div>
            
        ))}
        </div>
    </div>
  )
}

export default Favorites
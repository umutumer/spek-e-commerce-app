import React from 'react'
import Navigation from '../Components/Navigation'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FaTrash } from 'react-icons/fa';
import { getUser, removeFromCart } from '../Redux/Action';

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const users = useSelector((state) => state.users);
    const loggedInUser = Array.isArray(users)
      ? users.find((user) => user.isLogin)
      : null;
    const Cart = loggedInUser && loggedInUser.sepetim;
    const UserId = loggedInUser ? loggedInUser.id : null;


    const handleRemoveFromCart = (product) =>{
        UserId && dispatch(removeFromCart(UserId,product)).then(() => {
         dispatch(getUser())
        })
      }
  return (
    <div className='bg-white dark:bg-slate-800 text-black dark:text-white'>
        <Navigation />
        <div className='min-h-screen' >
            <div>
                <div className='flex flex-wrap w-full'>
                    {Cart && Cart.map((c,index) =>(
                        <div key={index} className='w-56 m-5 flex items-center justify-between border dark:border-slate-600'>
                            <img src={c.resim} alt="resim" className='w-28 h-36' />
                            <div>
                            <p>{c.urunAdi}</p>
                            {c.adet === 1 ?(
                                <p>{c.fiyat}₺</p>
                            ):(
                                <p>{c.toplamFiyat}₺</p>
                            )}
                            </div>
                            <button className="p-1 text-red-600" onClick={() => handleRemoveFromCart(c)}><FaTrash /></button>
                        </div>
                    ))}
                </div>
            </div>
            <form>
                <label>Kart Üzerindeki İsim</label> <br />
                <input type="text" className='dark:bg-slate-800' /> <br />
                <label>Kart Numarası</label> <br />
                <input className='dark:bg-slate-800' type="text" /> <br />
                <label>CVV</label> <br />
                <input className='dark:bg-slate-800'  type="text" /> <br />
                <label >Son Kullanma Tarihi</label> <br />
                <select className='dark:bg-slate-800'  name="ay" id="ay">
                    <option value="Ocak">Ocak</option>
                    <option value="Şubat">Şubat</option>
                    <option value="Mart">Mart</option>
                    <option value="Nisan">Nisan</option>
                    <option value="Mayıs">Mayıs</option>
                    <option value="Haziran">Haziran</option>
                    <option value="Temmuz">Temmuz</option>
                    <option value="Ağustos">Ağustos</option>
                    <option value="Eylül">Eylül</option>
                    <option value="Ekim">Ekim</option>
                    <option value="Kasım">Kasım</option>
                    <option value="Aralık">Aralık</option>
                </select>
                <select className='dark:bg-slate-800' name="yıl" id="yıl">
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                </select>
            </form>
        </div>
    </div>
  )
}

export default Payment
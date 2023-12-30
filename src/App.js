import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Page/Home';
import Login from './Page/Login';
import Register from './Page/Register';
import Details from './Page/Details';
import UserInformation from './Page/UserInformation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Page/Cart';
import Favorites from './Page/Favorites';
import Payment from './Page/Payment';
import MyOrders from './Page/MyOrders';
import AdminHome from './Page/AdminHome';
import AdminProduct from './Page/AdminProduct';
import AdminOrders from './Page/AdminOrders';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/details/:id' element={<Details />} />
      <Route path='/userinformation' element={<UserInformation />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/myorders' element={<MyOrders />} />
      <Route path='/admin' element={<AdminHome />} />
      <Route path='/admin/product' element={<AdminProduct />} />
      <Route path='/admin/orders' element={<AdminOrders />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

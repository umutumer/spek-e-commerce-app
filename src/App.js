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
    </Routes>
    </BrowserRouter>
  );
}

export default App;

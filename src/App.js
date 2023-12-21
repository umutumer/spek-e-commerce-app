import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Page/Home';
import Login from './Page/Login';
import Register from './Page/Register';
import Details from './Page/Details';
import UserInformation from './Page/UserInformation';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/details/:id' element={<Details />} />
      <Route path='/userinformation' element={<UserInformation />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

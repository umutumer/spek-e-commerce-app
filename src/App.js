import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Page/Home';
import Login from './Page/Login';
import Register from './Page/Register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

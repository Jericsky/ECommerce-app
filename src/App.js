import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import CatalogPage from './pages/CatalogPage';
import Home from './pages/Home';
import ProductView from './pages/ProductView';
import Register from './pages/Register';
import AppNavbar from './components/AppNavbar';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Orders from './components/Orders';
import ResetPassword from './pages/ResetPassword';
import Error from './components/Error';


function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser(){
    localStorage.clear();
    setUser({
      id: null,
      isAdmin: null
    });
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if (data.user) {
        
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/products' element={<CatalogPage/>}/>
          <Route path='/product/:productId' element={<ProductView/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/all-orders' element={<Orders/>}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
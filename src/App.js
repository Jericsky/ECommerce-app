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
    fetch('http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/users/details', {
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
          <Route path='/products' element={<CatalogPage/>}/>
          <Route path='/product/:productId' element={<ProductView/>}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
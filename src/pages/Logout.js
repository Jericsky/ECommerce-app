import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function Logout() {

  const notyf = new Notyf();

  const { setUser, unsetUser } = useContext(UserContext);

  useEffect(() => {
    
    unsetUser(); 
    setUser({
      id: null,
      isAdmin: null
    });

  }, [unsetUser, setUser]); 

  return (
    <Navigate to='/login' />
  );
}

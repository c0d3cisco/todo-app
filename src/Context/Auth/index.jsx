import { useEffect, useState, createContext } from 'react';
import jwt_decode from "jwt-decode";
import cookie from 'react-cookies'
import axios from 'axios';
export const AuthContext = createContext();

function AuthProvider({ children }){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let cookieToken = cookie.load('auth');
    validateToken(cookieToken);
  }, []);

  const login = async (username, password) => {
    let payLoad = {
      baseURL: 'https://api-js401.herokuapp.com',
      url: '/signin',
      method: 'post',
      auth: {username, password}
    }
    let response = await axios(payLoad);
    let user = response.data;
    if (user){
      try {
        validateToken(user.token)
      } catch(err){
        setError(err);
        console.error(err);
      }
    }
  }

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      if (validUser){
        cookie.save('auth', token);
        setUser(validUser);
        setIsLoggedIn(true);
      }
    } catch(err){
      setError(err);
      console.error(err);
    }
  }

  
  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
  }

  const can = (capability) => {
    return user?.capabilities?.includes(capability)
  }

  const values = {
    isLoggedIn,
    user,
    error,
    login,
    logout,
    can,
  }
  return(
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

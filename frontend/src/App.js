import './App.css';
import UserContext from "./login/UserContext";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { useEffect, useState } from 'react';
//import { jwtDecode } from 'jwt-decode';

//import jwt_decode from 'jwt-decode';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';

import Lipsticks from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from "./common/LoadingSpinner";
import NavBar from './routes-nav/NavBar';
import Rotalar from "./routes-nav/Rotalar";

export const TOKEN_STORAGE_ID = "Lipsticks-token"

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          //let { username } = jwt_decode(token);
          let { username } = jwtDecode(token);

          Lipsticks.token = token;
          let currentUser = await Lipsticks.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await Lipsticks.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }
  async function login(loginData) {
    try {
      let token = await Lipsticks.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;
  return (

      <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
          <div className="App">
            <NavBar logout={logout} />
    {/*<Routes login={login} signup={signup} /> */}
    <Routes>
    <Route exact path="/" element={<Homepage />} />
  <Route exact path="/login" element={<LoginForm login={login} />} />
  <Route exact path="/signup" element={<SignupForm signup={signup} />} />
  </Routes>
          </div>
        </UserContext.Provider>
      </BrowserRouter>

  );
}

export default App;

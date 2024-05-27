import { useState } from "react";
import Home from "./components/Home/home";
import Profile from "./components/Profile/profile";
import Header from "./components/header/header";
import RegisterPage from "./components/register/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
export default function App() {
  const [isAuth, setAuth] = useState(false);

  return (
    <>
      <Router>
        <Header setAuth={setAuth} isAuth={isAuth}/>
        <Routes>
          <Route path="" element={<Home />} />
          <Route
            path="/register"
            element={<RegisterPage setAuth={setAuth} isAuth={isAuth} />}
          />
          <Route path="/profile" element={<Profile setAuth={setAuth}/>} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
        </Routes>
      </Router>
    </>
  );
}

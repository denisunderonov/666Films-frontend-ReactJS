import { Link } from "react-router-dom";
import "./header.css";
import "../../fonts/fonts.css";
import ProfileIMG from "./img/profile.jpg";

export default function Header({ isAuth }) {
  
  return (
    <header className="main-header">
      <div className="main-header__container">
        <Link to="/" className="main-header__logotype-href">
          <p className="main-header__logo">DevilEyes</p>
        </Link>
        {localStorage.getItem("token") ? <RegHeader /> : <NotRegHeader />}
      </div>
    </header>
  );
}

function RegHeader() {
  return (
    <div className="main-header__auth-container">
      <button className="main-header__log-button btn btn-info">
        избранное
      </button>
      <Link to="/profile">
        <img
          src={ProfileIMG}
          alt="Моё фото"
          className="main-header__acc-image"
        />
      </Link>
    </div>
  );
}

function NotRegHeader() {
  return (
    <>
      <div className="main-header__buttons-container">
        <Link
          to="/login"
          className="main-header__log-button btn btn-primary"
        >
          войти
        </Link>
        <Link
          to="/register"
          className="main-header__register-button btn btn-primary"
        >
          регистрация
        </Link>
      </div>
    </>
  );
}

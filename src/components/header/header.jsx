import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import ProfileIMG from "./img/profile.jpg";
import "./header.css";
import "../../fonts/fonts.css";

export default function Header({ isAuth }) {
  return (
    <header className="main-header">
      <div className="main-header__container">
        <Link to="/" className="main-header__logotype-href">
          <p className="main-header__logo">666films</p>
        </Link>
        {localStorage.getItem("token") ? <RegHeader /> : <NotRegHeader />}
      </div>
    </header>
  );
}

function RegHeader() {
  const profSelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profSelRef.current && !profSelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="main-header__auth-container">
      <ul
        ref={profSelRef}
        className="main-header__profile-selection"
        style={{ height: isOpen ? "auto" : "0px" }}
      >
        <li className="main-header__profile-selection--selector">
          <Link to="/profile">Профиль</Link>
        </li>
        <li className="main-header__profile-selection--selector">
          <Link to="#">Просмотрено</Link>
        </li>
        <li className="main-header__profile-selection--selector">
          <Link to="/recomends">Настройки рекомендаций</Link>
        </li>
      </ul>
      <img
        onClick={handleClick}
        src={ProfileIMG}
        alt="Моё фото"
        className="main-header__acc-image"
      />
    </div>
  );
}

function NotRegHeader() {
  return (
    <div className="main-header__buttons-container">
      <Link to="/login" className="main-header__log-button btn btn-primary">
        войти
      </Link>
      <Link
        to="/register"
        className="main-header__register-button btn btn-primary"
      >
        регистрация
      </Link>
    </div>
  );
}

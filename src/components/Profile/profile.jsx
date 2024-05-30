import './profile.css';
import ProfileIMG from '../header/img/profile.jpg';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function Profile({ setAuth, userData, setUserData }) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

  function handleExit(e) {
    localStorage.setItem("isAuth", "false");
    setAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData({});
    navigate('/');
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-block">
          <div className="profile-block__image-block">
            <img src={ProfileIMG} alt="" className="profile-image" />
            <span className="profile-login">{userData ? userData.user.login : 'Ошибка'}</span>
          </div>
          <div className="profile-block__info-block">
            <p className="profile__info-block--email">{userData ? userData.user.email : 'Ошибка'}</p>
            <p className="profile__info-block--password">*************</p>
            <button className="change-password btn btn-danger">изменить пароль</button>
            <button onClick={handleExit} className="change-password btn btn-danger">Выйти</button>
          </div>
        </div>
      </div>
    </div>
  );
}

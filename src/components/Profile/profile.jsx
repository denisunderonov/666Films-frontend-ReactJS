import "./profile.css";
import ProfileIMG from "../header/img/profile.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as URLS from "../../url.js";
import SimpleAlert from "../simplealert/simplealert.jsx";

export default function Profile({ setAuth, userData, setUserData }) {
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
        setError(false)
      }, 3000); // Показывать alert на 3 секунды
      return () => clearTimeout(timer);
    }
  }, [alert]);

  async function handleDelete() {
    try {
      const userId = userData.user.id;
      await fetch(`${URLS.backURL}/deleteacc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      localStorage.setItem("isAuth", "false");
      setAuth(false);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setUserData({});
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  }

  async function handleChangePassword() {
    try {
      const userId = userData.user.id;
      const response = await fetch(`${URLS.backURL}/changepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newPassword }),
      });

      if (response.ok) {
        setIsChangingPassword(false);
        setNewPassword("");
        setAlert(true);
      } else {
        setError(true);
        setAlert(true);
        console.error("Error changing password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  }

  function handleExit(e) {
    localStorage.setItem("isAuth", "false");
    setAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData({});
    navigate("/");
  }

  return (
    <>
      <div className="profile">
        <div className="profile-container">
          <div className="profile-block">
            <div className="profile-block__image-block">
              <img src={ProfileIMG} alt="" className="profile-image" />
              <span className="profile-login">
                {userData ? userData.user.login : "Ошибка"}
              </span>
              <button
                onClick={handleDelete}
                className="delete-acc btn btn-danger"
              >
                Удалить аккаунт
              </button>
            </div>
            <div className="profile-block__info-block">
              <p className="profile__info-block--email">
                {userData ? userData.user.email : "Ошибка"}
              </p>
              {isChangingPassword && (
                <input
                  type="password"
                  className="profile__info-block--password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              )}
              {isChangingPassword ? (
                <button
                  onClick={handleChangePassword}
                  className="set-password btn btn-success"
                >
                  Подтвердить
                </button>
              ) : (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="change-password btn btn-danger"
                >
                  Изменить пароль
                </button>
              )}
              <button
                onClick={handleExit}
                className="change-password btn btn-danger"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
      {alert && <SimpleAlert text={error ? 'Ошибка при изменении пароля' : 'Пароль успешно изменен'} alertStatus={error ? 'error' : 'success'} />}
    </>
  );
}

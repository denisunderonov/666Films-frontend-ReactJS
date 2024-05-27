import { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import SimpleAlert from "../simplealert/simplealert";

const url = "http://localhost:4444/auth/login";

export default function Login({ setAuth }) {
  const [message, setMessage] = useState(null);
  const [key, setKey] = useState(0); // Временное состояние для обновления компонента

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();
      if (data.status === true) {
        console.log(data);
        setAuth(true);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setMessage(data.message);
        setKey((prevKey) => prevKey + 1); 
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  }

  return (
    <>
      <div className="login">
        <div className="login-container">
          <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
            <p className="login-form__account-text">авторизация</p>
            <input type="text" name="login" placeholder="Введите логин" />
            <input
              type="password"
              name="password"
              placeholder="Введите пароль"
            />
            <button
              type="submit"
              className="login-form__login-button btn btn-primary"
            >
              войти
            </button>
          </form>
        </div>
      </div>
      {message ? <SimpleAlert key={key} text={message} alertStatus={`error`} /> : null }
    </>
  );
}

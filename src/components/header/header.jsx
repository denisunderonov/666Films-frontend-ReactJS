import React from "react";
import logo from "./img/logo.png";
import "./header.css";

export default function Header() {
  const [regWindow, setRegWindow] = React.useState(false);

  function utilsModal() {
    if (regWindow === false) {
      document.getElementById("registration-modal").showModal();
      setRegWindow(true);
    } else {
      document.getElementById("registration-modal").close();
      setRegWindow(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch("../../database/registration.php", {
      method: "POST",
      body: formData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        // Обработка ответа, если необходимо
      })
      .catch((error) => {
        console.error("There was an error with fetch operation:", error);
      });
  }

  return (
    <header className="main-header">
      <div className="main-header__container">
        <img
          className="main-header__logotype"
          src={logo}
          alt="DailyDevil logotype"
        />
        <button
          className="main-header__login-button btn btn-secondary"
          onClick={utilsModal}
        >
          войти
        </button>

        <dialog aria-labelledby="registration-form" id="registration-modal">
          <button
            type="button"
            className="btn-close close-register-modal"
            aria-label="Close"
            onClick={utilsModal}
          ></button>
          <form onSubmit={handleSubmit} id="registration-form">
            <label>
              <span>Логин</span>
              <input type="text" name="login" placeholder="Введите логин" />
            </label>
            <label>
              <span>Почта</span>
              <input type="email" name="email" placeholder="Введите почту" />
            </label>
            <label>
              <span>Пароль</span>
              <input
                type="password"
                name="password"
                placeholder="Введите пароль"
              />
            </label>
            <button className="registration-form__reigster-button btn btn-primary">
              Зарегистрироваться
            </button>
          </form>
        </dialog>
      </div>
    </header>
  );
}

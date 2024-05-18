import Header from "../header/header";
import "./register.css";
export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="registration">
        <div className="registration-container">
          <form id="registration-form">
            <p className="registration-form__account-text">регистрация</p>
            <input type="text" name="login" placeholder="Введите логин" />
            <input type="email" name="email" placeholder="Введите почту" />
            <input
              type="password"
              name="password"
              placeholder="Введите пароль"
            />
            <button className="registration-form__register-button btn btn-primary">
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

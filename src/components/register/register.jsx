import "./register.css";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:4444/auth/register";

export default function RegisterPage({ setAuth, setUserData }) {
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

      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.message}`);
      }

      const data = await response.json();
      console.log(data);
      if (data.status === true) {
        setAuth(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
        navigate("/profile"); // Перенаправляем пользователя на страницу профиля после регистрации
      } else {
        console.error("Неизвестная ошибка");
      }
      console.log("Успешная регистрация:", data);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  }

  return (
    <div className="registration">
      <div className="registration-container">
        <form id="registration-form" onSubmit={handleSubmit}>
          <p className="registration-form__account-text">регистрация</p>
          <input type="text" name="login" placeholder="Введите логин" required />
          <input type="email" name="email" placeholder="Введите почту" required />
          <input type="password" name="password" placeholder="Введите пароль" required />
          <button
            type="submit"
            className="registration-form__register-button btn btn-primary"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

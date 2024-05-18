import Header from "../header/header";
import "./register.css";

const url = "http://localhost:4445/auth/register";

export default function RegisterPage() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    console.log(formObject);

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
      console.log("Успешная регистрация:", data);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  }

  return (
    <>
      <Header />
      <div className="registration">
        <div className="registration-container">
          <form id="registration-form" onSubmit={(e) => handleSubmit(e)}>
            <p className="registration-form__account-text">регистрация</p>
            <input type="text" name="login" placeholder="Введите логин" />
            <input type="email" name="email" placeholder="Введите почту" />
            <input
              type="password"
              name="password"
              placeholder="Введите пароль"
            />
            <button
              type="submit"
              className="registration-form__register-button btn btn-primary"
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

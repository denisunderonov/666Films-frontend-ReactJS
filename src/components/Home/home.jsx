import SimpleAlert from "../simplealert/simplealert";
import "./home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [genres, setGenres] = useState({ films: [], series: [], animes: [] });
  const [selectedGenres, setSelectedGenres] = useState({
    films: [],
    series: [],
    animes: [],
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch("http://localhost:4444/genres", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Ошибка сети: " + response.statusText);
        }

        const data = await response.json();
        console.log(data);
        setGenres(data);
      } catch (error) {
        console.error("Ошибка при получении жанров:", error);
      }
    }

    fetchGenres();
  }, []);

  const handleCheckboxChange = (type, genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      const newSelectedGenres = { ...prevSelectedGenres };
      if (newSelectedGenres[type].includes(genre)) {
        newSelectedGenres[type] = newSelectedGenres[type].filter(
          (g) => g !== genre
        );
      } else {
        newSelectedGenres[type].push(genre);
      }
      return newSelectedGenres;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected genres:", selectedGenres);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:4444/recomendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedGenres),
      });

      if (!response.ok) {
        throw new Error("Ошибка сети: " + response.statusText);
      }

      const data = await response.json();
      console.log("Рекомендации успешно отправлены:", data);

      setSubmitSuccess(true);

    } catch (error) {
      console.error("Ошибка при отправке рекомендаций:", error);
    }
  };

  useEffect(() => {
    if (submitSuccess) {
      navigate('/');
    }
  }, [submitSuccess, navigate]);

  return (
    <>
      <IsToast />
      <div className="home">
        <div className="home-container">
          <h2 className="home__main-text">Настройки рекомендаций</h2>
          <form onSubmit={handleSubmit}>
            <div className="genres-section">
              <h3>Фильмы</h3>
              <ul className="home__films-list rec-list">
                {genres.films.length > 0 ? (
                  genres.films.map((genre, index) => (
                    <li key={index} className="home__films-list--item rec-item">
                      <label>
                        <input
                          type="checkbox"
                          value={genre}
                          onChange={() => handleCheckboxChange("films", genre)}
                        />
                        <span>{genre}</span>
                      </label>
                    </li>
                  ))
                ) : (
                  <p>Загрузка жанров...</p>
                )}
              </ul>
            </div>
            <div className="genres-section">
              <h3>Сериалы</h3>
              <ul className="home__series-list rec-list">
                {genres.series.length > 0 ? (
                  genres.series.map((genre, index) => (
                    <li
                      key={index}
                      className="home__series-list--item rec-item"
                    >
                      <label>
                        <input
                          type="checkbox"
                          value={genre}
                          onChange={() => handleCheckboxChange("series", genre)}
                        />
                        <span>{genre}</span>
                      </label>
                    </li>
                  ))
                ) : (
                  <p>Загрузка жанров...</p>
                )}
              </ul>
            </div>
            <div className="genres-section">
              <h3>Аниме</h3>
              <ul className="home__anime-list rec-list">
                {genres.animes.length > 0 ? (
                  genres.animes.map((genre, index) => (
                    <li key={index} className="home__anime-list--item rec-item">
                      <label>
                        <input
                          type="checkbox"
                          value={genre}
                          onChange={() => handleCheckboxChange("animes", genre)}
                        />
                        <span>{genre}</span>
                      </label>
                    </li>
                  ))
                ) : (
                  <p>Загрузка жанров...</p>
                )}
              </ul>
            </div>
            <button
              type="submit"
              className="submit-button btn btn-success"
            >
              Обновить рекомендации
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function IsToast() {
  if (localStorage.getItem("isFirstReg") === "true") {
    localStorage.setItem("isFirstReg", "false");
    return (
      <SimpleAlert text={`Успешная регистрация!`} alertStatus={`success`} />
    );
  }
  return null;
}

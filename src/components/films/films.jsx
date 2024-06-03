import "./films.css";
import Leftbar from "../leftbar/leftbar";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner";

export default function FilmsPage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const response = await fetch("http://localhost:4444/films", {
          method: "GET",
        });
        const data = await response.json();
        setFilms(data.result);
      } catch (error) {
        console.error("Ошибка при отправке запроса на сервер:", error);
      }
    }

    fetchMovieData();
  }, []);

  useEffect(() => {
    const filmsBlocks = document.querySelectorAll(".page__items-list--item");
    filmsBlocks.forEach((film) => {
      const filmTitle = film.querySelector(".page__item--title");

      if (filmTitle) {
        film.addEventListener("mouseover", () => {
          filmTitle.classList.remove('hide');
          filmTitle.classList.add("animated");
        });

        film.addEventListener("mouseout", () => {
          filmTitle.classList.add('hide');
          filmTitle.classList.remove("animated");
        });
      }
    });
  }, [films]);

  return (
    <>
      <Leftbar />
      <div className="page">
        <div className="page-container">
          <ul className="page__items-list">
            {films.length > 0 ? (
              films.map((film, index) => (
                <li
                  key={index}
                  className="page__items-list--item"
                  style={{
                    backgroundImage: `url(${film.url})`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                  }}
                >
                  <p className="page__item--title"><span>{film.title}</span></p>
                </li>
              ))
            ) : (
              <Spinner />
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

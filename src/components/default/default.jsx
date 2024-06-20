import Leftbar from "../leftbar/leftbar";
import "./default.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/spinner";
import * as URLS from '../../url.js';

export default function DefaultPage() {
  const [recommendations, setRecommendations] = useState({
    movies: [],
    series: [],
    animes: [],
  });
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate(); 

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/unauthorized");
    } else {
      fetchRecommendations();
    }
  }, [navigate]); 
  useEffect(() => {
    function handleMouseOver(event) {
      const filmTitle = event.currentTarget.querySelector(".page__item--title");
      const filmRating = event.currentTarget.querySelector('.page__item--rating');
      if (filmTitle) {
        filmTitle.classList.remove('hide');
        filmTitle.classList.add("animated");
        filmRating.style.fontSize = 'large';
      }
    }

    function handleMouseOut(event) {
      const filmTitle = event.currentTarget.querySelector(".page__item--title");
      const filmRating = event.currentTarget.querySelector('.page__item--rating');
      if (filmTitle) {
        filmTitle.classList.add('hide');
        filmTitle.classList.remove("animated");
        filmRating.style.fontSize = 'medium';
      }
    }

    const filmsBlocks = document.querySelectorAll(".page__items-list--item");
    filmsBlocks.forEach((film) => {
      film.addEventListener("mouseover", handleMouseOver);
      film.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      filmsBlocks.forEach((film) => {
        film.removeEventListener("mouseover", handleMouseOver);
        film.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, [recommendations]);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${URLS.backURL}/getrecomends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const data = await response.json();
      setRecommendations(data);
      setLoading(false); 
    } catch (error) {
      console.error("Ошибка при получении рекомендаций:", error);
      setLoading(false);
    }
  };

  function handleClick(id, type) {
    navigate(`/${type}/${id}`);
  }

  return (
    <>
      <Leftbar />
      <div className="default">
        <div className="default-container">
          <h2>Ваши рекомендации</h2>
          <h3>Фильмы</h3>
          <ul className="page__items-list">
            {loading ? (
              <Spinner />
            ) : recommendations.movies.length > 0 ? (
              recommendations.movies.map((movie) => (
                <li
                  onClick={() => handleClick(movie.id, movie.type)}
                  key={movie.id}
                  className="page__items-list--item"
                  style={{
                    backgroundImage: `url(${movie.url})`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                  }}
                >
                  <div className="page__item--rating">{movie.rating}</div>
                  <p className="page__item--title">
                    <span>{movie.title}</span>
                  </p>
                </li>
              ))
            ) : (
              <p className="rectext">Нет рекомендаций для фильмов :c</p>
            )}
          </ul>
          <h3>Сериалы</h3>
          <ul className="page__items-list">
            {loading ? (
              <Spinner />
            ) : recommendations.series.length > 0 ? (
              recommendations.series.map((series) => (
                <li
                  onClick={() => handleClick(series.id, series.type)}
                  key={series.id}
                  className="page__items-list--item"
                  style={{
                    backgroundImage: `url(${series.url})`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                  }}
                >
                  <div className="page__item--rating">{series.rating}</div>
                  <p className="page__item--title">
                    <span>{series.title}</span>
                  </p>
                </li>
              ))
            ) : (
              <p className="rectext">Нет рекомендаций для сериалов :c</p>
            )}
          </ul>
          <h3>Аниме</h3>
          <ul className="page__items-list">
            {loading ? (
              <Spinner />
            ) : recommendations.animes.length > 0 ? (
              recommendations.animes.map((anime) => (
                <li
                  onClick={() => handleClick(anime.id, anime.type)}
                  key={anime.id}
                  className="page__items-list--item"
                  style={{
                    backgroundImage: `url(${anime.url})`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                  }}
                >
                  <div className="page__item--rating">{anime.rating}</div>
                  <p className="page__item--title">
                    <span>{anime.title}</span>
                  </p>
                </li>
              ))
            ) : (
              <p className="rectext">Нет рекомендаций для аниме :c</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

import "./page.css";
import Leftbar from "../leftbar/leftbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/spinner";

export default function Page({ route }) {
  const [films, setFilms] = useState([]);
  const [titleName, setTitleName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const response = await fetch(`http://localhost:4444/${route}`, {
          method: "GET",
        });
        const data = await response.json();
        setFilms(data.result);
        console.log(data.result);
      } catch (error) {
        console.error("Ошибка при отправке запроса на сервер:", error);
      }
    }

    fetchMovieData();

    if (route === 'films') {
      setTitleName('фильмов');
    } else if (route === 'serials') {
      setTitleName('сериалов');
    } else if (route === 'anime') {
      setTitleName('аниме');
    }
  }, [route]);

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
  }, [films]);

  function handleClick(id) {
    navigate(`/${route}/${id}`);
  }

  return (
    <>
      <Leftbar />
      <div className="page">
        <div className="page-container">
          <p className="page__main-text">Библиотека {titleName}</p>
          <ul className="page__items-list">
            {films.length > 0 ? (
              films.map((film) => (
                <li
                  onClick={() => handleClick(film.id)}
                  key={film.id}
                  className="page__items-list--item"
                  style={{
                    backgroundImage: `url(${film.url})`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                  }}
                >
                  <div className="page__item--rating">{film.rating}</div>
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

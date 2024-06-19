import "./watched.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/spinner";
import * as URLS from '../../url.js';

export default function WatchedPage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatched = async () => {
      try {
        const response = await fetch(`${URLS.backURL}/watched`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setFilms(data.result);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка в получении просмотренных элементов", error);
      }
    };

    fetchWatched();
  }, []);

  const handleClick = (id, type) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="watch">
      <div className="watch-container">
        <p className="watch__main-text">Просмотрено</p>
        <ul className="watch__items-list">
          {!loading ? (
            films.length > 0 ? (
              films.map((film) => (
                <li
                  onClick={() => handleClick(film.id, film.type)}
                  key={film.id}
                  className="watch__items-list--item"
                  style={{
                    backgroundImage: `url(${film.url})`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                  }}
                >
                  <div className="watch__item--rating">{film.rating}</div>
                  <p className="watch__item--title">
                    <span>{film.title}</span>
                  </p>
                </li>
              ))
            ) : (
              <p>Нет просмотренных элементов</p>
            )
          ) : (
            <Spinner />
          )}
        </ul>
      </div>
    </div>
  );
}

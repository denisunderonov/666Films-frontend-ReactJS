import "./itemPage.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../spinner/spinner";
import Leftbar from "../leftbar/leftbar";
import * as URLS from '../../url.js';

export default function ItemPage({ route }) {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [isWatched, setIsWatched] = useState(false); // Изначально считаем, что не просмотрено
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${URLS.backURL}/${route}/${id}`);
        const data = await response.json();
        setItemData(data);
        checkWatched();
      } catch (error) {
        console.error("Ошибка в получении данных", error);
      }
    };

    const checkWatched = async () => {
      try {
        const response = await fetch(`${URLS.backURL}/watched/check/${route}/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setIsWatched(data.isWatched);
      } catch (error) {
        console.error("Ошибка в проверке состояния просмотра", error);
      }
    };

    fetchItem();
  }, [id, route]);

  const handleWatch = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    try {
      const method = isWatched ? 'remove' : 'add';
      const response = await fetch(`${URLS.backURL}/watched/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          series_id: route === 'serials' ? id : null,
          movie_id: route === 'films' ? id : null,
          anime_id: route === 'anime' ? id : null
        })
      });

      if (response.ok) {
        setIsWatched(!isWatched);
      } else {
        console.error("Ошибка при обновлении состояния просмотра");
      }
    } catch (error) {
      console.error("Ошибка при обновлении состояния просмотра", error);
    }
  };

  return itemData ? (
    <>
      <Leftbar />

      <div className="item-page">
        <div className="item-page-container">
          <div className="item-page__border-container">
            <div className="item-page__item-container">
              <img
                src={itemData ? itemData.result[0].url : ""}
                alt=""
                className="item-page__image"
              />
              <div className="item-page__information">
                <p className="item-page__information--title">
                  {itemData ? itemData.result[0].title : ""}
                </p>
                <p className="item-page__information--year">
                  <span>Год</span>
                  <span className="bootstrap-blocks">
                    {itemData ? itemData.result[0].year : ""}
                  </span>
                </p>
                <p className="item-page__information--genres">
                  <span>Жанры</span>
                  <span className="bootstrap-blocks">
                    {itemData ? itemData.result[0].genres : ""}
                  </span>
                </p>
                <p className="item-page__information--rating">
                  <span>Рейтинг</span>
                  <span className="bootstrap-blocks">
                    {itemData ? itemData.result[0].rating : ""}
                  </span>
                </p>
                {itemData.result[0].seasons ? (
                  <p className="item-page__information--rating">
                    <span>Количество сезонов</span>
                    <span className="bootstrap-blocks">
                      {itemData.result[0].seasons}
                    </span>
                  </p>
                ) : (
                  ""
                )}
                <p className="item-page__information--duration">
                  <span>Длительность</span>
                  <span className="bootstrap-blocks">
                    {itemData ? itemData.result[0].duration + " мин" : ""}
                  </span>
                </p>
              </div>
            </div>
            <div className="item-page__buttons-container">
              <button
                className={`prsm-btn btn ${isWatched ? 'btn-success' : 'btn-danger'}`}
                onClick={handleWatch}
              >
                <span>{isWatched ? 'Просмотрено' : 'Не просмотрено'}</span>
              </button>
            </div>
            <p className="item-page__description-main-text">Описание</p>
            <p className="item-page__description">
              {itemData ? itemData.result[0].description : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
}

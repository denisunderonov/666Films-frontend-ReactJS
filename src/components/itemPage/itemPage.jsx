import "./itemPage.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../spinner/spinner";
import Leftbar from "../leftbar/leftbar";

export default function ItemPage({ route }) {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [isLike, setLike] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:4444/${route}/${id}`);
        const data = await response.json();
        setItemData(data);
        console.log(data);
      } catch (error) {
        console.error("Ошибка в получении данных", error);
      }
    };

    fetchItem();
  }, [id, route]);

  function handleWatch(e) {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    console.log(e)
    if(isLike === false) {
      e.target.textContent = 'Просмотрено';
      e.target.style.backgroundColor = 'var(--bs-green)';
      setLike(true);
    } else if (isLike === true) {
      e.target.textContent = 'Не просмотрено';
      e.target.style.backgroundColor = 'var(--bs-gray)';
      setLike(false);
    }
  }


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
              <button className="prsm-btn" onClick={(e) => handleWatch(e)}><span>Не просмотрено</span></button>
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

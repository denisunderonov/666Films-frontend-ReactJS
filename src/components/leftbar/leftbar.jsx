import "./leftbar.css";
import { Link } from "react-router-dom";
import arrowIMG from "./assets/arrow.svg";

export default function Leftbar() {
  function handleBarClick(e) {
    const barButton = e.target;
    const leftbar = e.target.parentNode;
    let leftbarLeft = leftbar.style.left;

    if (leftbarLeft === "0px") {
      leftbar.style.left = "-150px";
      barButton.style.transform = "rotate(180deg)";
    } else {
      leftbar.style.left = "0px";
      barButton.style.transform = "rotate(0deg)";
    }
  }

  return (
    <>
      <div className="leftbar">
        <img
          src={arrowIMG}
          onClick={(e) => handleBarClick(e)}
          alt="Скрыть / Показать боковую панель"
          className="leftbar__open-close-btn"
        />
        <div className="leftbar-container">
          <ul className="leftbar__list">
            <li className="leftbar__list--item">
              <Link to="#">Фильмы</Link>
            </li>
            <li className="leftbar__list--item">
              <Link to="#">Сериалы</Link>
            </li>
            <li className="leftbar__list--item">
              <Link to="#">Аниме</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

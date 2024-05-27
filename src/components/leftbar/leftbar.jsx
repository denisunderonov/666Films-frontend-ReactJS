import "./leftbar.css";
import { Link } from "react-router-dom";

export default function Leftbar() {
  return (
    <>
      <div className="leftbar">
        <div className="leftbar-container">
          <ul className="leftbar__list">
            <li className="leftbar__list--item">
              <Link to="#">Фильмы</Link>
            </li>
            <li className="leftbar__list--item">
              <Link to="#">Сериалы</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

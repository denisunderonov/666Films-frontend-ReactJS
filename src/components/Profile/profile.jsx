import './profile.css';
import ProfileIMG from '../header/img/profile.jpg';
import { useNavigate } from "react-router-dom";

export default function Profile({ setAuth }) {
    const navigate = useNavigate()


    function handleExit(e) {
        setAuth(false);
        localStorage.setItem("isAuth", "false");
        localStorage.removeItem("token");
        navigate('/');
    }

    return (
        <>
        <div className="profile">
            <div className="profile-container">
                <div className="profile-block">
                    <div className="profile-block__image-block">
                        <img src={ProfileIMG} alt="" className="profile-image" />
                        <span className="profile-login">Логин</span>
                    </div>
                    <div className="profile-block__info-block">
                        <p className="profile__info-block--email">denisunderonov@ggg.com</p>
                        <p className="profile__info-block--password">*************</p>
                        <button className="change-password btn btn-danger">изменить пароль</button>
                        <button onClick={(e) => handleExit(e)} className="change-password btn btn-danger">Выйти</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
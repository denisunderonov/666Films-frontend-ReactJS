import Header from "../header/header";
import './profile.css';
import ProfileIMG from '../header/img/profile.jpg'

export default function Profile() {
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
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
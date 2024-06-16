import './unauthorize.css';
import { Link } from 'react-router-dom';
export default function UnauthorizePage() {
    return (
        <div className="unauth">
            <div className="unauth-container">
                <div>
                    <h1>Похоже, что вы не авторизованы...</h1>
                    <Link to='/login' className='btn btn-primary'>Авторизоваться!</Link>
                </div>
            </div>
        </div>
    );
}
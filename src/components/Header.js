import styles from '../styles/Header.css';
import logo from '../assets/image/logo.png';
import { NavLink } from 'react-router-dom';
import logoutIcon from '../assets/icon/logoutIcon.png';

function Header() {
    return (
        <header className='header'>
            <div className='header-left'>
                <img src={logo} alt='LTE' className='header-logo'/>
                <span className='header-title'>Lion To do Everything</span>
            </div>
            <nav className='header-nav'>
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    홈
                </NavLink>
                <NavLink to="/friends" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    친구
                </NavLink>
                <NavLink to="/mypage" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    마이페이지
                </NavLink>
            </nav>

            <div className="header-right">
                <span className="user-name">홍길동님</span>
                <img src={logoutIcon} alt="로그아웃" className="logout-icon" />
            </div>
        </header>
    );
}

export default Header;
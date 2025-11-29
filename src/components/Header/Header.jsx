import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoPersonCircleOutline } from 'react-icons/io5';
import './Header.css';

// 로고 이미지 불러오기 (경로 확인!)
import LogoImg from '../../assets/images/Logo.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = localStorage.getItem('isLoggedIn');
    if (checkLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className='header-container'>
      {/* 1. 왼쪽: 로고 이미지로 교체 */}
      <div className='header-left'>
        <Link to='/'>
          <img src={LogoImg} alt='TaG 로고' className='header-logo-img' />
        </Link>
      </div>

      {/* 2. 중앙: 메뉴 */}
      <nav className='header-center'>
        <ul className='header-nav'>
          <li>
            <NavLink to='/submit'>기부</NavLink>
          </li>
          <li>
            <NavLink to='/store'>스토어</NavLink>
          </li>
          <li>
            <NavLink to='/guide'>이용방법</NavLink>
          </li>
          <li>
            <NavLink to='/history'>이용내역</NavLink>
          </li>
          <li>
            <NavLink to='/wishlist'>마음함</NavLink>
          </li>
        </ul>
      </nav>

      {/* 3. 오른쪽: 로그인/마이페이지 */}
      <div className='header-right'>
        {isLoggedIn ? (
          <Link to='/mypage' className='login-link'>
            <IoPersonCircleOutline className='profile-icon' />
            <span>마이페이지</span>
          </Link>
        ) : (
          <Link to='/login' className='login-link'>
            <IoPersonCircleOutline className='profile-icon' />
            <span>로그인</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

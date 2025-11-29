import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

// 소셜 아이콘
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // [핵심] 로그인 성공 표시를 브라우저에 저장
    localStorage.setItem('isLoggedIn', 'true');

    alert('로그인 되었습니다!');

    // 홈으로 이동하면서 페이지를 새로고침해야 헤더가 바뀝니다.
    window.location.href = '/';
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} 로그인 기능은 준비 중입니다.`);
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h1 className='login-logo'>TaG</h1>

        <form className='login-form' onSubmit={handleLogin}>
          <input
            type='email'
            className='input-field'
            placeholder='이메일 주소'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            className='input-field'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit' className='login-button'>
            로그인
          </button>
        </form>

        <div className='link-container'>
          <Link to='/signup' className='link-text'>
            회원가입
          </Link>
          <span className='separator'>|</span>
          <Link to='/find-password' className='link-text'>
            비밀번호 찾기
          </Link>
        </div>

        <div className='social-divider'>
          <span>간편 로그인</span>
        </div>

        <div className='social-login-container'>
          <button
            className='social-btn kakao'
            onClick={() => handleSocialLogin('카카오')}
          >
            <RiKakaoTalkFill className='social-icon' />
          </button>
          <button
            className='social-btn google'
            onClick={() => handleSocialLogin('구글')}
          >
            <FcGoogle className='social-icon' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

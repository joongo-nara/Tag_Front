import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

// 소셜 아이콘
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  const navigate = useNavigate();

  // 입력값 상태
  const [nickname, setNickname] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [isDomainDisabled, setIsDomainDisabled] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 에러 메시지 상태
  const [nicknameError, setNicknameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 도메인 목록
  const allowedDomains = [
    'naver.com',
    'gmail.com',
    'daum.net',
    'hanmail.net',
    'kakao.com',
    'icloud.com',
    'outlook.com',
  ];

  // 비밀번호 일치 검사
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  // 도메인 선택 핸들러
  const handleDomainSelect = (e) => {
    const value = e.target.value;
    if (value === 'type') {
      setEmailDomain('');
      setIsDomainDisabled(false);
    } else {
      setEmailDomain(value);
      setIsDomainDisabled(true);
    }
  };

  // 회원가입 버튼 핸들러
  const handleSignup = (e) => {
    e.preventDefault();

    setNicknameError('');
    setEmailError('');

    // 1. 닉네임 검사
    if (nickname.length < 2 || nickname.length > 10) {
      setNicknameError('닉네임은 2자 이상 10자 이하로 입력해주세요.');
      return;
    }

    // 2. 이메일 검사
    if (!emailId || !emailDomain) {
      setEmailError('이메일 주소를 모두 입력해주세요.');
      return;
    }
    const fullEmail = `${emailId}@${emailDomain}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fullEmail)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      return;
    }

    // 3. 비밀번호 검사
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // [임시] 성공 처리
    alert(`환영합니다, ${nickname}님!\n회원가입이 완료되었습니다.`);
    navigate('/login');
  };

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        {/* 로고 */}
        <h1 className='signup-logo'>TaG</h1>
        <p className='signup-subtitle'>회원가입</p>

        <form className='signup-form' onSubmit={handleSignup}>
          {/* 닉네임 */}
          <div className='input-wrapper'>
            <input
              type='text'
              className='input-field'
              placeholder='닉네임 (2~10자)'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {nicknameError && <p className='error-message'>{nicknameError}</p>}
          </div>

          {/* 이메일 */}
          <div className='input-wrapper'>
            <div className='email-input-group'>
              <input
                type='text'
                className='input-field email-id'
                placeholder='이메일'
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <span className='email-at'>@</span>
              <input
                type='text'
                className='input-field email-domain'
                placeholder='직접 입력'
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
                disabled={isDomainDisabled}
              />
              <select
                className='email-select'
                onChange={handleDomainSelect}
                defaultValue='type'
              >
                <option value='type'>직접 입력</option>
                {allowedDomains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
            {emailError && <p className='error-message'>{emailError}</p>}
          </div>

          {/* 비밀번호 */}
          <div className='input-wrapper'>
            <input
              type='password'
              className='input-field'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className='input-wrapper'>
            <input
              type='password'
              className='input-field'
              placeholder='비밀번호 확인'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && <p className='error-message'>{passwordError}</p>}
          </div>

          {/* 가입 버튼 */}
          <button type='submit' className='signup-button'>
            회원가입
          </button>
        </form>

        {/* 로그인 링크 */}
        <div className='link-container'>
          이미 계정이 있으신가요? <Link to='/login'>로그인</Link>
        </div>

        {/* 소셜 로그인 */}
        <div className='social-divider'>
          <span>간편 회원가입</span>
        </div>

        <div className='social-login-container'>
          <button
            className='social-btn kakao'
            onClick={() => alert('준비 중입니다.')}
          >
            <RiKakaoTalkFill className='social-icon' />
          </button>
          <button
            className='social-btn google'
            onClick={() => alert('준비 중입니다.')}
          >
            <FcGoogle className='social-icon' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

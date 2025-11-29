import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FindPassword.css';

const FindPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1단계: 인증번호 받기
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      alert(`[${email}] 로 인증 코드가 전송되었습니다.`);
      setStep(2);
      setIsLoading(false);
    }, 500);
  };

  // 2단계: 비밀번호 변경
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordCheck) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      alert(
        '비밀번호가 성공적으로 변경되었습니다.\n로그인 페이지로 이동합니다.'
      );
      navigate('/login');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className='find-password-page'>
      <div className='find-password-container'>
        <h1 className='find-password-logo'>TaG</h1>
        <p className='find-password-subtitle'>비밀번호 찾기</p>

        {/* 1단계 폼 */}
        {step === 1 && (
          <form className='find-password-form' onSubmit={handleRequestCode}>
            <div className='input-wrapper'>
              <input
                type='email'
                className='input-field'
                placeholder='가입한 이메일 주소'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type='submit'
              className='find-password-button'
              disabled={isLoading}
            >
              {isLoading ? '전송 중...' : '인증번호 받기'}
            </button>
          </form>
        )}

        {/* 2단계 폼 */}
        {step === 2 && (
          <form className='find-password-form' onSubmit={handleChangePassword}>
            <p className='info-text'>
              {email} (으)로 전송된
              <br />
              인증 코드를 입력해주세요.
            </p>

            <div className='input-wrapper'>
              <input
                type='text'
                className='input-field'
                placeholder='인증 코드 6자리'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <div className='input-wrapper'>
              <input
                type='password'
                className='input-field'
                placeholder='새 비밀번호'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className='input-wrapper'>
              <input
                type='password'
                className='input-field'
                placeholder='새 비밀번호 확인'
                value={newPasswordCheck}
                onChange={(e) => setNewPasswordCheck(e.target.value)}
                required
              />
            </div>

            {error && <p className='error-message'>{error}</p>}

            <button
              type='submit'
              className='find-password-button'
              disabled={isLoading}
            >
              {isLoading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </form>
        )}

        <div className='link-container'>
          <Link to='/login'>로그인 페이지로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;

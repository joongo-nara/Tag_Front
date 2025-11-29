import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../../components/Header/Header';  <-- 이거 제거! (App.jsx에 이미 있음)
import './MyPage.css';

// 아이콘
import {
  IoCameraOutline,
  IoHeart,
  IoShirtOutline,
  IoResizeOutline,
} from 'react-icons/io5';

// --- [1] 사이드바 컴포넌트 ---
const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  };

  const menuGroups = [
    {
      title: '쇼핑 정보',
      items: ['마음함', '이용 내역'],
    },
    {
      title: '내 정보 관리',
      items: ['프로필 수정', '사이즈 설정'],
    },
    {
      title: '계정',
      items: ['로그아웃'],
    },
  ];

  return (
    <aside className='sidebar'>
      {menuGroups.map((group, index) => (
        <div className='sidebar-group' key={index}>
          <h3 className='sidebar-title'>{group.title}</h3>
          <ul className='sidebar-menu'>
            {group.items.map((item) => (
              <li
                key={item}
                className={`sidebar-menu-item ${
                  activeMenu === item ? 'active' : ''
                }`}
                onClick={() =>
                  item === '로그아웃' ? handleLogout() : setActiveMenu(item)
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

// --- [2] 콘텐츠: 마음함 ---
const MyWishlistContent = () => {
  const wishItems = [
    {
      id: 1,
      name: '벌룬핏 바지(블랙)',
      price: '40,000',
      img: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: '피그먼트 후드 집업',
      price: '45,000',
      img: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className='content-wrapper'>
      <h2 className='content-title'>마음함</h2>
      <div className='wish-grid'>
        {wishItems.map((item) => (
          <div key={item.id} className='wish-card'>
            <div className='wish-img-box'>
              <div className='placeholder-img'>상품 이미지</div>
            </div>
            <div className='wish-info'>
              <p className='wish-name'>{item.name}</p>
              <p className='wish-price'>{item.price}원</p>
            </div>
            <button className='wish-btn active'>
              <IoHeart />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- [3] 콘텐츠: 이용 내역 ---
const MyHistoryContent = () => {
  return (
    <div className='content-wrapper'>
      <h2 className='content-title'>이용 내역</h2>
      <div className='history-list-preview'>
        <div className='history-item-row'>
          <span className='history-date'>2023.11.20</span>
          <span className='history-desc'>아디다스 자켓 구매완료</span>
          <span className='history-status done'>배송완료</span>
        </div>
        <div className='history-item-row'>
          <span className='history-date'>2023.11.15</span>
          <span className='history-desc'>헌옷 수거 요청 (15kg)</span>
          <span className='history-status ongoing'>수거중</span>
        </div>
      </div>
    </div>
  );
};

// --- [4] 콘텐츠: 프로필 수정 ---
const ProfileEditContent = () => {
  const [nickname, setNickname] = useState('TaG사용자');
  const [intro, setIntro] = useState('안녕하세요! 지구를 지키는 옷장입니다.');

  return (
    <div className='content-wrapper'>
      <h2 className='content-title'>프로필 수정</h2>
      <form className='profile-form'>
        <div className='profile-img-area'>
          <div className='profile-img-circle'></div>
          <button type='button' className='camera-btn'>
            <IoCameraOutline />
          </button>
        </div>

        <div className='form-group'>
          <label>닉네임</label>
          <input
            type='text'
            className='input-field'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>한줄 소개</label>
          <textarea
            className='input-field textarea'
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </div>

        <button className='save-btn'>저장하기</button>
      </form>
    </div>
  );
};

// --- [5] 콘텐츠: 사이즈 설정 ---
const SizeSettingContent = () => {
  const [mySize, setMySize] = useState('M');
  const [details, setDetails] = useState({
    shoulder: '',
    chest: '',
    arm: '',
    length: '',
  });

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSave = () => {
    alert(`사이즈 정보가 저장되었습니다!\n(기본: ${mySize})`);
  };

  return (
    <div className='content-wrapper'>
      <h2 className='content-title'>사이즈 설정</h2>

      <div className='size-section'>
        <h3 className='sub-title'>
          <IoShirtOutline /> 평소 입는 사이즈
        </h3>
        <div className='size-select-group'>
          {sizes.map((s) => (
            <button
              key={s}
              className={`size-btn ${mySize === s ? 'active' : ''}`}
              onClick={() => setMySize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className='divider'></div>

      <div className='size-section'>
        <h3 className='sub-title'>
          <IoResizeOutline /> 상세 치수 입력 (cm)
        </h3>
        <p className='desc-text'>
          내 몸에 딱 맞는 옷을 추천받기 위해 입력해주세요.
        </p>

        <div className='detail-size-grid'>
          <div className='size-input-item'>
            <label>어깨 너비</label>
            <input
              type='number'
              name='shoulder'
              placeholder='0'
              value={details.shoulder}
              onChange={handleDetailChange}
            />
          </div>
          <div className='size-input-item'>
            <label>가슴 단면</label>
            <input
              type='number'
              name='chest'
              placeholder='0'
              value={details.chest}
              onChange={handleDetailChange}
            />
          </div>
          <div className='size-input-item'>
            <label>팔 길이</label>
            <input
              type='number'
              name='arm'
              placeholder='0'
              value={details.arm}
              onChange={handleDetailChange}
            />
          </div>
          <div className='size-input-item'>
            <label>총 기장</label>
            <input
              type='number'
              name='length'
              placeholder='0'
              value={details.length}
              onChange={handleDetailChange}
            />
          </div>
        </div>
      </div>

      <button className='save-btn' onClick={handleSave}>
        사이즈 정보 저장
      </button>
    </div>
  );
};

// --- 메인 MyPage 컴포넌트 ---
const MyPage = () => {
  const [activeMenu, setActiveMenu] = useState('프로필 수정');

  const renderContent = () => {
    switch (activeMenu) {
      case '마음함':
        return <MyWishlistContent />;
      case '이용 내역':
        return <MyHistoryContent />;
      case '프로필 수정':
        return <ProfileEditContent />;
      case '사이즈 설정':
        return <SizeSettingContent />;
      default:
        return <ProfileEditContent />;
    }
  };

  return (
    <div className='mypage-container'>
      {/* Header 제거 (App.jsx에서 이미 표시됨) */}
      <div className='mypage-layout'>
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <main className='mypage-content'>{renderContent()}</main>
      </div>
    </div>
  );
};

export default MyPage;

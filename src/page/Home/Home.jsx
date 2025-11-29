import React, { useState, useEffect } from 'react';
import './Home.css';

// 1. 슬라이드 이미지 임포트 (경로 확인 필수!)
import LogoImg from '../../assets/images/Logo.png';
import Slide1 from '../../assets/images/waste_mountain.png';
import Slide2 from '../../assets/images/plastic_clothes.png';
import Slide3 from '../../assets/images/factory_smoke.png';
import Slide4 from '../../assets/images/landfill_machines.png';
import Slide5 from '../../assets/images/ocean_waste.png';
import Slide6 from '../../assets/images/giant_dump.png';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. 슬라이드 데이터 (이미지, 동적 텍스트)
  const slides = [
    {
      image: Slide1,
      text: '매년 버려지는 의류 폐기물 12톤',
    },
    {
      image: Slide2,
      text: '플라스틱을 재활용한 새로운 의류',
    },
    {
      image: Slide3,
      text: '의류 산업 폐기물로 인한 심각한 탄소 배출 문제',
    },
    {
      image: Slide4,
      text: '환경을 파괴하는 거대한 의류 매립지',
    },
    {
      image: Slide5,
      text: '바다로 흘러 들어가는 폐기물 더미',
    },
    {
      image: Slide6,
      text: '의류 폐기물, 산처럼 쌓여가는 환경 재앙',
    },
  ];

  // 3. 슬라이드 자동 재생 로직
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); // 4초마다 이미지 전환

    return () => clearInterval(interval); // 컴포넌트 정리 시 인터벌 해제
  }, [slides.length]);

  return (
    <div className='home-container'>
      {/* 1. 상단 미션 및 로고 영역 */}
      <section className='mission-section'>
        <div className='logo-box'>
          <img src={LogoImg} alt='TaG Logo' className='mission-logo' />
        </div>
        <p className='mission-text'>
          버려지는 의류를 수거해
          <br />
          탄소 절감과 의류의 선순환 구조를 만듭니다.
          <br />
          TaG은 의류의 새로운 가치를 발견하고,
          <br />
          지속 가능한 패션 산업을 만들어갑니다.
        </p>
      </section>

      {/* 2. 동적 헤드라인 (슬라이드에 따라 텍스트 변경) */}
      <section className='headline-section'>
        <div className='headline-bar'>
          {slides.map((slide, index) => (
            <h2
              key={index}
              className={`headline-text ${
                currentSlide === index ? 'active' : ''
              }`}
            >
              {slide.text}
            </h2>
          ))}
        </div>
      </section>

      {/* 3. 슬라이드쇼 및 하단 회색 영역 */}
      <section className='slideshow-section'>
        <div className='slideshow-wrapper'>
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`slide-image ${
                currentSlide === index ? 'active' : ''
              }`}
            />
          ))}
        </div>
      </section>

      {/* (선택) 여백 확보를 위한 더미 영역 */}
      <div style={{ height: '50px' }}></div>
    </div>
  );
};

export default Home;

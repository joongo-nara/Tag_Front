import React from 'react';
import { Link } from 'react-router-dom';
import './Submit.css';

// 이미지 파일 불러오기
import deliveryImg from '../../assets/images/delivery-post.png';
import pickupImg from '../../assets/images/pickup-truck.png';

const Submit = () => {
  return (
    <div className='submit-container'>
      {/* 1. 택배 보내기 (이미지 왼쪽, 텍스트 오른쪽) */}
      <Link to='/submit/delivery' className='card-link'>
        <div className='submit-card card-delivery'>
          {/* 이미지 먼저 */}
          <div className='card-image-area'>
            <img src={deliveryImg} alt='우체국 택배 보내기' />
          </div>

          {/* 텍스트 나중 (오른쪽 정렬) */}
          <div className='card-text-area'>
            <h2 className='card-title'>택배 보내기</h2>
            <p className='card-desc'>판매 및 기부원하시는 상품 보내주세요.</p>
            <p className='card-sub-desc'>비대면 수거 요청 가능합니다.</p>
          </div>
        </div>
      </Link>

      {/* 2. 수거 요청하기 (텍스트 왼쪽, 이미지 오른쪽) */}
      <Link to='/submit/pickup' className='card-link'>
        <div className='submit-card card-pickup'>
          {/* 텍스트 먼저 (왼쪽 정렬) */}
          <div className='card-text-area'>
            <h2 className='card-title'>수거 요청하기</h2>
            <p className='card-desc'>10KG부터 가능합니다.</p>
            <p className='card-sub-desc'>비대면 수거 요청 가능합니다.</p>
          </div>

          {/* 이미지 나중 */}
          <div className='card-image-area'>
            <img src={pickupImg} alt='수거 차량' />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Submit;

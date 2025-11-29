import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

// 이미지 (Store.jsx와 동일하게 불러오기)
import jacketImg from '../../assets/images/jacket.png';
import pantsBeigeImg from '../../assets/images/pants-beige.png';
import pantsBlackImg from '../../assets/images/pants-black.png';
import hoodieImg from '../../assets/images/hoodie.png';

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 상품 ID 가져오기
  const navigate = useNavigate();

  // 데이터 (나중에는 API로 받아오겠지만, 지금은 Store와 똑같이 세팅)
  const products = [
    {
      id: 1,
      name: '자켓(카키)',
      img: jacketImg,
      price: 55000,
      category: '아우터',
      size: 'L',
      desc: '빈티지한 무드의 카키색 자켓입니다.\n가을철 데일리 아이템으로 추천드려요.',
    },
    {
      id: 2,
      name: '벌룬핏 바지(베이지)',
      img: pantsBeigeImg,
      price: 38000,
      category: '하의',
      size: 'M',
      desc: '편안한 착용감의 벌룬핏 바지입니다.\n베이지 컬러로 어디에나 잘 어울립니다.',
    },
    {
      id: 3,
      name: '아디다스 벌룬핏 바지(블랙)',
      img: pantsBlackImg,
      price: 40000,
      category: '하의',
      size: 'L',
      desc: '아디다스 특유의 스포티함과\n트렌디한 벌룬핏이 만난 유니크한 바지입니다.',
    },
    {
      id: 4,
      name: '피그먼트 후드 집업',
      img: hoodieImg,
      price: 45000,
      category: '상의',
      size: 'XL',
      desc: '피그먼트 워싱이 들어간 후드 집업입니다.\n오버핏으로 편하게 입을 수 있습니다.',
    },
  ];

  // ID에 맞는 상품 찾기
  const product = products.find((p) => p.id === parseInt(id));

  // 상품이 없을 경우 예외 처리
  if (!product) {
    return <div className='not-found'>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className='detail-container'>
      {/* 왼쪽: 상품 이미지 */}
      <div className='detail-left'>
        <div className='image-box'>
          <img src={product.img} alt={product.name} />
        </div>
      </div>

      {/* 오른쪽: 상품 정보 */}
      <div className='detail-right'>
        {/* 1. 상품 이름 박스 */}
        <div className='info-box title-box'>
          <h2>{product.name}</h2>
        </div>

        {/* 2. 카테고리 / 사이즈 박스 */}
        <div className='tags-row'>
          <div className='info-box tag-box'>{product.category}</div>
          <div className='info-box tag-box'>{product.size}</div>
        </div>

        {/* 3. 상품 설명 박스 */}
        <div className='info-box desc-box'>
          <p>{product.desc}</p>
        </div>

        {/* 4. 가격 및 구매 버튼 */}
        <div className='bottom-area'>
          <span className='price-text'>{product.price.toLocaleString()}원</span>
          <button
            className='purchase-btn'
            onClick={() => alert('구매 페이지로 이동합니다.')}
          >
            구매 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmitDelivery.css';
import { IoCameraOutline, IoCloseCircle } from 'react-icons/io5';

const SubmitDelivery = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 입력값 상태 관리
  const [images, setImages] = useState([]);
  const [weight, setWeight] = useState('');
  const [priceRequest, setPriceRequest] = useState(''); // price -> priceRequest (DB 컬럼 price_request)

  // 사진 첨부 함수
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      alert('사진은 최대 10장까지 등록 가능합니다.');
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };

  // 사진 삭제 함수
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // ★ 접수하기 버튼 클릭 (검증 로직 추가)
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 기본 제출 방지

    // 1. 무게 입력 확인
    if (!weight.trim()) {
      alert('무게를 입력해주세요.');
      return;
    }

    // 2. 금액 입력 확인 (price -> priceRequest)
    if (!priceRequest.trim()) {
      alert('금액을 입력해주세요.');
      return;
    }

    // 3. 사진 첨부 확인 (최소 1장)
    if (images.length === 0) {
      alert('사진을 최소 1장 이상 등록해주세요.');
      return;
    }

    // 모든 확인 통과 시
    alert('접수 완료되었습니다!');
    navigate('/');
  };

  return (
    <div className='delivery-container'>
      <h2 className='page-title'>택배 상품 접수하기</h2>
      <div className='divider-line'></div>

      <form className='delivery-form' onSubmit={handleSubmit}>
        {/* 배송방법 (수정 불가) */}
        <div className='form-row'>
          <label className='form-label'>
            배송방법 <span className='required'>*</span>
          </label>
          <div className='input-group'>
            <input
              type='text'
              value='택배'
              disabled
              readOnly
              className='input-box disabled'
            />
          </div>
        </div>

        {/* 무게 (입력 필수) */}
        <div className='form-row'>
          <label className='form-label'>
            무게(kg) <span className='required'>*</span>
          </label>
          <div className='input-group'>
            <input
              type='text'
              placeholder='상품 무게를 입력해주세요.'
              className='input-box'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        {/* 주소 (수정 불가 - readOnly 및 disabled 클래스 적용) */}
        <div className='form-row address-row'>
          <label className='form-label'>
            주소 <span className='required'>*</span>
          </label>
          <div className='input-group-vertical'>
            <input
              type='text'
              value='경기 의정부시 호원동 산101-1'
              readOnly
              className='input-box disabled'
            />
            <input
              type='text'
              value='경기 의정부시 호암로 95 신한대학교 기도관 2060호'
              readOnly
              className='input-box disabled'
            />
          </div>
        </div>

        {/* 금액 (입력 필수) */}
        <div className='form-row'>
          <label className='form-label'>
            금액 <span className='required'>*</span>
          </label>
          <div className='input-group'>
            <input
              type='text'
              placeholder='택배 배송 금액을 입력하세요.'
              className='input-box'
              value={priceRequest}
              onChange={(e) => setPriceRequest(e.target.value)}
            />
          </div>
        </div>

        {/* 사진등록 (필수) */}
        <div className='form-row'>
          <label className='form-label'>
            사진등록 <span className='required'>*</span>
          </label>
          <div className='input-group'>
            <div className='photo-area'>
              <div
                className='photo-upload-box'
                onClick={() => fileInputRef.current.click()}
              >
                <IoCameraOutline className='camera-icon' />
                <span className='photo-count'>{images.length}/10</span>
              </div>

              <input
                type='file'
                multiple
                accept='image/*'
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />

              {images.map((img, index) => (
                <div key={index} className='preview-box'>
                  <img src={img.preview} alt='preview' />
                  <button
                    type='button'
                    className='delete-img-btn'
                    onClick={() => removeImage(index)}
                  >
                    <IoCloseCircle />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 구분선 및 버튼 */}
        <div className='divider-line bottom-line'></div>

        <div className='button-area'>
          <button type='submit' className='submit-btn'>
            접수하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitDelivery;

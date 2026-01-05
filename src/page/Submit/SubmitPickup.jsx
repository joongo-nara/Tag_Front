import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmitPickup.css';
import { IoCameraOutline, IoCloseCircle } from 'react-icons/io5';

const SubmitPickup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 상태 관리
  const [images, setImages] = useState([]);
  const [weight, setWeight] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  // 사진 추가
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

  // 사진 삭제
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // 주소 검색 버튼 (지금은 기능 예시)
  const handleAddressSearch = () => {
    alert('주소 검색 API를 연결할 예정입니다.\n(지금은 직접 입력해주세요)');
  };

  // 접수하기 검증
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. 무게 확인 (10kg 이상인지)
    if (!weight || parseInt(weight) < 10) {
      alert('수거는 10kg 이상부터 가능합니다.');
      return;
    }

    // 2. 주소 확인
    if (!address.trim()) {
      alert('주소를 입력해주세요.');
      return;
    }

    // 3. 사진 확인
    if (images.length === 0) {
      alert('사진을 최소 1장 이상 등록해주세요.');
      return;
    }

    alert('수거 요청이 접수되었습니다!');
    navigate('/');
  };

  return (
    <div className='pickup-container'>
      <h2 className='page-title'>수거 상품 접수하기</h2>
      <div className='divider-line'></div>

      <form className='pickup-form' onSubmit={handleSubmit}>
        {/* 배송방법 */}
        <div className='form-row'>
          <label className='form-label'>
            배송방법 <span className='required'>*</span>
          </label>
          <div className='input-group'>
            <input
              type='text'
              value='수거'
              disabled
              readOnly
              className='input-box disabled'
            />
          </div>
        </div>

        {/* 무게 (안내문구 추가) */}
        <div className='form-row'>
          <label className='form-label'>
            무게(kg) <span className='required'>*</span>
          </label>
          <div className='input-group'>
            <input
              type='number'
              placeholder='상품 무게를 입력해주세요.'
              className='input-box'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <p className='helper-text'>✓ 수거는 10kg이상부터 가능합니다.</p>
          </div>
        </div>

        {/* 주소 (검색 버튼 추가) */}
        <div className='form-row'>
          <label className='form-label'>
            주소 <span className='required'>*</span>
          </label>
          <div className='input-group-vertical'>
            {/* 검색 버튼이 있는 줄 */}
            <div className='address-search-row'>
              <input
                type='text'
                placeholder='주소'
                className='input-box'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                type='button'
                className='search-btn'
                onClick={handleAddressSearch}
              >
                주소 검색
              </button>
            </div>
            {/* 상세 주소 */}
            <input
              type='text'
              placeholder='상세 주소'
              className='input-box'
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>
        </div>

        {/* 금액 (무료 고정) */}
        <div className='form-row'>
          <label className='form-label'>
            금액 <span className='required'>*</span>
          </label>
          <div className='input-group'>
            <input
              type='text'
              value='상품 수거는 무료입니다.'
              disabled
              readOnly
              className='input-box disabled'
            />
          </div>
        </div>

        {/* 사진등록 */}
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

        {/* 하단 구분선 & 버튼 */}
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

export default SubmitPickup;

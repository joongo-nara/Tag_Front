import React from 'react';
import './History.css';

// --- 구매 내역용 이미지 (유지) ---
import jacket from '../../assets/images/jacket.png';
import pantsBeige from '../../assets/images/pants-beige.png';
import pantsBlack from '../../assets/images/pants-black.png';
import hoodieBlack from '../../assets/images/hoodie.png';

// --- 접수 내역용 이미지 ---
// 진행 중인 건 로고가 뜨니까 다 지우고, 마지막 '등록 완료'된 상품만 가져옵니다.
import mantoman from '../../assets/images/mantoman.png';

// 앱 로고 (진행 중일 때 뜸)
import appLogo from '../../assets/images/Logo.png';

const History = () => {
  // 1. 구매 내역 데이터
  const purchaseItems = [
    { id: 1, image: jacket, label: '자켓' },
    { id: 2, image: pantsBeige, label: '벌룬핏 바지(베이지)' },
    { id: 3, image: pantsBlack, label: '벌룬핏 바지(블랙)' },
    { id: 4, image: hoodieBlack, label: '워싱 후드집업(블랙)' },
  ];

  // 2. 접수 내역 데이터
  const registrationItems = [
    // 1~3번: 진행 중 -> 이미지가 필요 없음 (null로 둬도 로직상 로고가 뜸)
    { id: 1, image: null, label: '접수완료(수거 대기)', status: 'waiting' },
    { id: 2, image: null, label: '접수완료(이동중)', status: 'moving' },
    { id: 3, image: null, label: '분류 및 상품 구분 중', status: 'sorting' },

    // 4번: 등록 완료 -> 실제 이미지(mantoman) 보여줌
    { id: 4, image: mantoman, label: '상품 등록 완료', status: 'registered' },
  ];

  return (
    <div className='history-container'>
      {/* 섹션 1: 구매 내역 */}
      <section className='history-section'>
        <div className='section-info'>
          <h2 className='section-title'>구매 내역</h2>
          <p className='section-desc'>최근 구매 내역입니다.</p>
        </div>

        <div className='card-list'>
          {purchaseItems.map((item) => (
            <div key={item.id} className='history-card'>
              <div className='card-image-box'>
                <img src={item.image} alt={item.label} />
              </div>
              <div className='card-label'>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 2: 접수 내역 */}
      <section className='history-section'>
        <div className='section-info'>
          <h2 className='section-title'>접수 내역</h2>
          <p className='section-desc'>
            접수 상품 내역입니다.
            <br />
            접수 상품의 현재 상태를 확인할 수 있습니다.
          </p>
        </div>

        <div className='card-list'>
          {registrationItems.map((item) => {
            // 등록 완료(registered)면 -> item.image (맨투맨)
            // 아니면 -> appLogo (로고)
            const isRegistered = item.status === 'registered';
            const displayImage = isRegistered ? item.image : appLogo;
            const imgClass = isRegistered ? '' : 'logo-img';

            return (
              <div key={item.id} className='history-card'>
                <div className='card-image-box'>
                  <img
                    src={displayImage}
                    alt={item.label}
                    className={imgClass}
                  />
                </div>
                <div className='card-label'>{item.label}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default History;

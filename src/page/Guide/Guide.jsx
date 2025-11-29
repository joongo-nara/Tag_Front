import React from 'react';
import './Guide.css';
import { 
  IoCubeOutline, 
  IoHomeOutline, 
  IoCheckmarkCircleOutline,
  IoScaleOutline,
  IoCalendarOutline,
  IoCarOutline
} from "react-icons/io5";

const Guide = () => {
  return (
    <div className="guide-container">
      
      {/* 메인 타이틀(Hero) 영역 삭제됨 */}

      <div className="guide-content">
        
        {/* 섹션 1: 택배 보내기 */}
        <section className="guide-section">
          <h2 className="section-title">📦 택배 보내기 (소량)</h2>
          <div className="steps-grid">
            
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="icon-box"><IoCheckmarkCircleOutline /></div>
              <h3>신청하기</h3>
              <p>'기부' 페이지에서<br/>[택배 보내기]를 선택하고<br/>신청서를 작성합니다.</p>
            </div>
            
            <div className="step-arrow">›</div>
            
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="icon-box"><IoCubeOutline /></div>
              <h3>박스 포장</h3>
              <p>보내실 물품을<br/>박스에 꼼꼼하게 포장해주세요.</p>
            </div>
            
            <div className="step-arrow">›</div>
            
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="icon-box"><IoHomeOutline /></div>
              <h3>택배 보내기</h3>
              <p>가까운 우체국, 편의점 등에서<br/>업체 주소로 보내주시면 됩니다.</p>
            </div>

          </div>
        </section>

        {/* 구분선 */}
        <div className="divider"></div>

        {/* 섹션 2: 수거 요청하기 */}
        <section className="guide-section">
          <h2 className="section-title">🚚 수거 요청하기 (10kg 이상)</h2>
          <div className="steps-grid">
            
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="icon-box"><IoScaleOutline /></div>
              <h3>무게 확인</h3>
              <p>물품의 무게가 총 10kg이<br/>넘는지 확인해주세요.<br/>(대량 수거 전용)</p>
            </div>
            
            <div className="step-arrow">›</div>
            
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="icon-box"><IoCalendarOutline /></div>
              <h3>방문 예약</h3>
              <p>'기부' 페이지에서<br/>[수거 요청하기]를 선택하고<br/>방문 날짜를 잡습니다.</p>
            </div>
            
            <div className="step-arrow">›</div>
            
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="icon-box"><IoCarOutline /></div>
              <h3>문 앞 배치</h3>
              <p>약속된 수거일에<br/>문 앞에 박스를 놓아두면<br/>기사님이 가져갑니다.</p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Guide;
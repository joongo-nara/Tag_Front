import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Store.css';

import {
  IoSearchOutline,
  IoHeart,
  IoHeartOutline,
  IoTimeOutline,
  IoCloseOutline,
} from 'react-icons/io5';

// 이미지 (경로 확인 필수!)
import jacketImg from '../../assets/images/jacket.png';
import pantsBeigeImg from '../../assets/images/pants-beige.png';
import pantsBlackImg from '../../assets/images/pants-black.png';
import hoodieImg from '../../assets/images/hoodie.png';

const Store = () => {
  // 1. 초기 데이터
  const initialData = [
    {
      id: 1,
      name: '자켓(카키)',
      img: jacketImg,
      liked: false,
      category: 'outer',
      options: ['M', 'L', 'XL'],
    },
    {
      id: 2,
      name: '벌룬핏 바지(베이지)',
      img: pantsBeigeImg,
      liked: false,
      category: 'bottom',
      options: ['S', 'M', 'L'],
    },
    {
      id: 3,
      name: '벌룬핏 바지(블랙)',
      img: pantsBlackImg,
      liked: false,
      category: 'bottom',
      options: ['M', 'L', 'XL'],
    },
    {
      id: 4,
      name: '피그먼트 후드 집업',
      img: hoodieImg,
      liked: false,
      category: 'top',
      options: ['L', 'XL', 'XXL'],
    },
  ];

  // 옵션 목록 정의
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const categoryOptions = [
    { label: '상의', value: 'top' },
    { label: '하의', value: 'bottom' },
    { label: '아우터', value: 'outer' },
    { label: '신발', value: 'shoes' },
    { label: '악세사리', value: 'acc' },
  ];

  // 상태 관리
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('store-products');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [activeTab, setActiveTab] = useState('size');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recent-searches');
    return saved ? JSON.parse(saved) : [];
  });

  // 데이터 저장
  useEffect(() => {
    localStorage.setItem('store-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // --- 필터링 로직 (핵심) ---
  const getFilteredProducts = () => {
    let currentList = products;

    // 1) 카테고리 필터링
    if (selectedCategories.length > 0) {
      currentList = currentList.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // 2) 사이즈 필터링 (수정 완료: 데이터 안전장치 추가)
    if (selectedSizes.length > 0) {
      currentList = currentList.filter((product) =>
        (product.options || []).some((option) => selectedSizes.includes(option))
      );
    }

    // 3) 검색어 필터링
    if (keyword.trim()) {
      const query = keyword.trim().toLowerCase();
      currentList = currentList.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    return currentList;
  };

  const filteredProducts = getFilteredProducts();

  // --- UI/핸들러 함수들 ---
  const toggleLike = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );
  };

  const toggleTab = (tabName) => {
    if (activeTab === tabName) setActiveTab(null);
    else setActiveTab(tabName);
  };

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size))
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    else setSelectedSizes([...selectedSizes, size]);
  };

  const handleCategoryChange = (value) => {
    if (selectedCategories.includes(value))
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    else setSelectedCategories([...selectedCategories, value]);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && keyword.trim() !== '') {
      const newHistory = [
        keyword,
        ...recentSearches.filter((w) => w !== keyword),
      ].slice(0, 5);
      setRecentSearches(newHistory);
      e.target.blur();
    }
  };

  const removeHistory = (target) => {
    setRecentSearches(recentSearches.filter((w) => w !== target));
  };
  const clearHistory = () => {
    setRecentSearches([]);
  };

  return (
    <div className='store-container'>
      {/* 필터 헤더 UI */}
      <div className='filter-header'>
        {/* 검색창 */}
        <div className='search-box-white'>
          <IoSearchOutline className='search-icon' />
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            className='search-input'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* 탭 버튼 */}
        <div className='filter-tabs'>
          <button
            className={`tab-btn ${activeTab === 'size' ? 'active' : ''}`}
            onClick={() => toggleTab('size')}
          >
            사이즈
          </button>
          <button
            className={`tab-btn ${activeTab === 'category' ? 'active' : ''}`}
            onClick={() => toggleTab('category')}
          >
            카테고리
          </button>
        </div>

        {/* 필터 옵션 패널 */}
        {activeTab && (
          <div className='filter-panel'>
            <div className='panel-content-split'>
              {/* [왼쪽] 필터 선택 */}
              <div className='panel-left'>
                <h4 className='panel-title'>
                  {activeTab === 'size' ? '사이즈 선택' : '카테고리 선택'}
                </h4>

                {activeTab === 'size' && (
                  <div className='checkbox-group'>
                    {sizeOptions.map((size) => (
                      <label key={size} className='custom-checkbox'>
                        <input
                          type='checkbox'
                          checked={selectedSizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                        />
                        <span className='checkmark'></span>
                        <span className='label-text'>{size}</span>
                      </label>
                    ))}
                  </div>
                )}

                {activeTab === 'category' && (
                  <div className='checkbox-group'>
                    {categoryOptions.map((option) => (
                      <label key={option.value} className='custom-checkbox'>
                        <input
                          type='checkbox'
                          checked={selectedCategories.includes(option.value)}
                          onChange={() => handleCategoryChange(option.value)}
                        />
                        <span className='checkmark'></span>
                        <span className='label-text'>{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* [오른쪽] 최근 검색 기록 */}
              <div className='panel-right'>
                <div className='history-header'>
                  <h4 className='panel-title'>최근 검색어</h4>
                  {recentSearches.length > 0 && (
                    <button className='clear-btn' onClick={clearHistory}>
                      전체 삭제
                    </button>
                  )}
                </div>

                {recentSearches.length > 0 ? (
                  <ul className='history-list'>
                    {recentSearches.map((word, idx) => (
                      <li key={idx} className='history-item'>
                        <span
                          className='history-word'
                          onClick={() => setKeyword(word)}
                        >
                          <IoTimeOutline className='time-icon' />
                          {word}
                        </span>
                        <button
                          className='remove-btn'
                          onClick={(e) => {
                            e.stopPropagation();
                            removeHistory(word);
                          }}
                        >
                          <IoCloseOutline />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='empty-history'>최근 검색 기록이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 상품 목록 (필터링 결과 표시) */}
      <div className='product-grid'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={`/store/${product.id}`}
              key={product.id}
              className='product-link'
            >
              <div className='product-card'>
                <div
                  className='like-btn'
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike(product.id);
                  }}
                >
                  {product.liked ? (
                    <IoHeart className='icon-heart-fill' />
                  ) : (
                    <IoHeartOutline className='icon-heart-empty' />
                  )}
                </div>

                <div className='product-img-wrapper'>
                  <img src={product.img} alt={product.name} />
                </div>
                <div className='product-info'>
                  <span className='product-name'>{product.name}</span>
                  <div className='product-sizes'>
                    {(product.options || []).join(', ')}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className='no-result'>
            <p>선택 조건에 맞는 상품이 없어요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;

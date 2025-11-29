import React, { useState, useEffect } from 'react';
import '../Store/Store.css'; // Store CSS 재사용

// 아이콘
import {
  IoSearchOutline,
  IoHeart,
  IoTimeOutline,
  IoCloseOutline,
  IoHeartOutline,
} from 'react-icons/io5';

const Wishlist = () => {
  // 데이터 불러오기
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('store-products');
    return saved ? JSON.parse(saved) : [];
  });

  // UI 상태
  const [activeTab, setActiveTab] = useState('size');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 옵션 목록
  const categoryOptions = [
    { label: '상의', value: 'top' },
    { label: '하의', value: 'bottom' },
    { label: '아우터', value: 'outer' },
    { label: '신발', value: 'shoes' },
    { label: '악세사리', value: 'acc' },
  ];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // 검색 관련 상태
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recent-searches');
    return saved ? JSON.parse(saved) : [];
  });

  // 데이터/기록 저장 효과
  useEffect(() => {
    localStorage.setItem('store-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // --- 기능 함수들 ---
  const toggleLike = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );
  };

  const toggleTab = (tab) => setActiveTab(activeTab === tab ? null : tab);

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

  const handleHistoryClick = (word) => {
    setKeyword(word);
    setIsFocused(false);
  };

  // --- 필터링 로직 (핵심) ---
  const getFilteredProducts = () => {
    // 1. 시작 목록: 찜한 상품만 가져오기
    let currentList = products.filter((p) => p.liked);

    // 2. 카테고리 필터링
    if (selectedCategories.length > 0) {
      currentList = currentList.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // 3. 사이즈 필터링 (수정 완료: 데이터 안전장치 추가)
    if (selectedSizes.length > 0) {
      currentList = currentList.filter((product) =>
        (product.options || []).some((option) => selectedSizes.includes(option))
      );
    }

    // 4. 검색어 필터링
    if (keyword.trim()) {
      const query = keyword.trim().toLowerCase();
      currentList = currentList.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    return currentList;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className='store-container'>
      {/* 필터 헤더 */}
      <div className='filter-header'>
        {/* 검색 Wrapper */}
        <div className='search-wrapper'>
          <div className='search-box-white'>
            <IoSearchOutline className='search-icon' />
            <input
              type='text'
              placeholder='마음함 검색'
              className='search-input'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* 최근 검색어 드롭다운 */}
          {isFocused && recentSearches.length > 0 && (
            <div className='search-history-dropdown'>
              <div className='history-header'>
                <span>최근 검색어</span>
                <button onClick={clearHistory} className='clear-all-btn'>
                  전체 삭제
                </button>
              </div>
              <ul className='history-list'>
                {recentSearches.map((word, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleHistoryClick(word)}
                    className='history-item'
                  >
                    <div className='history-text'>
                      <IoTimeOutline className='time-icon' />
                      {word}
                    </div>
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
            </div>
          )}
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

        {/* 필터 패널 */}
        {activeTab && (
          <div className='filter-panel'>
            <div className='panel-content-split'>
              {/* 왼쪽 구역 (필터) */}
              <div className='panel-left'>
                <h4 className='panel-title'>
                  {activeTab === 'size' ? '사이즈 선택' : '카테고리 선택'}
                </h4>

                {/* 사이즈 탭 패널 */}
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

                {/* 카테고리 탭 패널 */}
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

              {/* 오른쪽 구역 (검색 기록) */}
              <div className='panel-right'>
                <div className='history-header'>
                  <h4 className='panel-title'>최근 검색어</h4>
                  {recentSearches.length > 0 && (
                    <button onClick={clearHistory} className='clear-btn'>
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
                          onClick={() => handleHistoryClick(word)}
                        >
                          <IoTimeOutline className='time-icon' />
                          {word}
                        </span>
                        <button
                          className='remove-btn'
                          onClick={() => removeHistory(word)}
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

      {/* 상품 목록 */}
      <div className='product-grid'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className='product-card'>
              <div className='like-btn' onClick={() => toggleLike(product.id)}>
                <IoHeart className='icon-heart-fill' />
              </div>
              <div className='product-img-wrapper'>
                <img src={product.img} alt={product.name} />
              </div>
              <div className='product-info'>
                <span className='product-name'>{product.name}</span>
                <div className='product-sizes'>
                  {product.options?.join(', ')}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='no-result'>
            <p>마음함이 비어있어요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

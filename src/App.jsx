// 이 파일은 수정할 필요 없이 완벽합니다. 이대로 계속 가시면 됩니다.
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

// 페이지들
import Home from './page/Home/Home';
import Submit from './page/Submit/Submit';
import SubmitDelivery from './page/Submit/SubmitDelivery';
import SubmitPickup from './page/Submit/SubmitPickup';
import Store from './page/Store/Store';
import Guide from './page/Guide/Guide';
import History from './page/History/History';
import Wishlist from './page/Wishlist/Wishlist';
import MyPage from './page/MyPage/MyPage';
import Signup from './page/Signup/Signup';
import Login from './page/Login/Login';
import FindPassword from './page/FindPassword/FindPassword';
import ProductDetail from './page/Store/ProductDetail';

function App() {
  return (
    <div className="app-container">
      {/* 헤더 고정 */}
      <Header />

      {/* 페이지 내용물 영역 */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/submit/delivery" element={<SubmitDelivery />} />
          <Route path="/submit/pickup" element={<SubmitPickup />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<ProductDetail />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/history" element={<History />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-password" element={<FindPassword />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
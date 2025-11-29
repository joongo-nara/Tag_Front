import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 라우터 불러오기
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 앱 전체를 감싸기 */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
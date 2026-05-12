import React from 'react';
import './App.css';
// 화면 상단(Header)과 하단(Footer)에 항상 보여줄 컴포넌트들을 가져옵니다.
import Header from './components/Header';
import Footer from './components/Footer';

// 각각의 주소(URL)에서 보여줄 페이지 컴포넌트들을 가져옵니다.
import MainPage from './pages/MainPage/Mainpage';
import LoginPage from './pages/LoginPage/Loginpage';
import FriendPage from './pages/FriendPage/FriendPage';
import FriendDetailPage from './pages/FriendPage/FriendDetailPage';

// 페이지 이동 기능을 구현하기 위한 도구들을 react-router-dom에서 가져옵니다.
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  // useLocation은 현재 사용자가 머물고 있는 페이지의 주소 정보를 가져오는 함수입니다.
  const location = useLocation();

  // 현재 페이지의 주소가 '/login'인지 확인합니다.
  // 로그인 페이지에서는 헤더와 푸터를 숨기기 위해 사용하는 조건입니다.
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {/* 논리 연산자(&&)를 사용한 조건부 렌더링입니다.
        로그인 페이지가 아닐 때(!isLoginPage)만 상단 헤더를 화면에 보여줍니다.
      */}
      {!isLoginPage && <Header />}

      {/* Routes는 여러 Route 중 현재 주소와 일치하는 하나만 골라서 보여주는 역할입니다. */}
      <Routes>
        {/* path는 브라우저 주소창의 경로이고, element는 그때 보여줄 화면입니다. */}
        
        {/* 메인 페이지 (기본 주소) */}
        <Route path="/" element={<MainPage />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 친구 목록 페이지 */}
        <Route path="/friends" element={<FriendPage />} />

        {/* 친구 상세 페이지입니다.
          ':id' 부분은 '파라미터'라고 부르며, 각 친구의 고유한 번호에 따라 
          동적인 주소(예: /friends/1, /friends/2)로 접속할 수 있게 해줍니다. 
        */}
        <Route path="/friends/:id" element={<FriendDetailPage />} />
      </Routes>

      {/* 헤더와 마찬가지로 로그인 페이지가 아닐 때만 하단 푸터를 보여줍니다. */}
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
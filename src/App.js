import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import FriendPage from './pages/FriendPage/FriendPage';

function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/friend" element={<FriendPage />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
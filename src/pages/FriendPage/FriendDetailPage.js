import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FriendCalendar from "./FriendCalendar";
import FriendTodo from "./FriendTodo";

import "../../styles/FriendDetailPage.css";

// 카테고리별 스타일 정의
const Categories = {
  공부: { backgroundColor: "#E5F8F1", color: "#333" },
  일상: { backgroundColor: "#FFC8BE", color: "#333" },
  동아리: { backgroundColor: "#B6DAFF", color: "#333" },
};

// 날짜 객체를 "YYYY-MM-DD" 형태의 문자열(Key)로 변환해주는 함수입니다.
const toDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// 데이터가 없을 때를 대비한 기본 친구 정보와 노래 목록입니다.
const dummyFriend = {
  followId: "1",
  name: "나나",
  tag: "1234",
  bio: "안녕하세요! 저는 나나입니다.",
  profileImage: null,
};

const dummySavedSongs = [
  { id: 1, title: "Ditto", artist: "NewJeans", imageUrl: null },
];

// 날짜별 할 일 데이터 (캘린더와 연동됩니다)
const dummyTodosByDate = {
  "2026-05-04": [
    { id: 1, text: "프론트 보충자료 읽기", category: "공부", completed: true },
    { id: 2, text: "FriendDetailPage 주석 달기", category: "공부", completed: false },
  ],
  "2026-05-06": [
    { id: 3, text: "친구 페이지 과제 제출", category: "동아리", completed: true },
  ],
  "2026-05-10": [
    { id: 4, text: "React 복습하기", category: "공부", completed: false },
    { id: 5, text: "동아리 회의", category: "동아리", completed: false },
    { id: 6, text: "산책하기", category: "일상", completed: true },
  ],
};

const dummyRemainingByDate = {
  "2026-05-04": { hasTodo: true, remaining: 1 },
  "2026-05-06": { hasTodo: true, remaining: 0 },
  "2026-05-10": { hasTodo: true, remaining: 2 },
};

function FriendDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지(목록)에서 클릭하여 넘어온 친구 정보를 가져옵니다.
  const passedFriend = location.state?.friend ?? null;

  // 컴포넌트에서 관리할 상태(state)들을 정의합니다.
  const [friend] = useState(passedFriend ?? dummyFriend);
  const [savedSongs] = useState(dummySavedSongs);
  const [selectedDate, setSelectedDate] = useState(new Date("2026-05-04"));
  const [todosByDate] = useState(dummyTodosByDate);
  const [remainingByDate] = useState(dummyRemainingByDate);

  // 저장된 곡 중 가장 최근 곡(첫 번째 곡)을 계산합니다.
  const latestSong = useMemo(() => {
    if (!Array.isArray(savedSongs) || savedSongs.length === 0) return null;
    return savedSongs[0];
  }, [savedSongs]);

  // 선택된 날짜에 해당하는 할 일 목록만 필터링합니다.
  const todos = useMemo(() => {
    const key = toDateKey(selectedDate);
    return todosByDate[key] ?? [];
  }, [selectedDate, todosByDate]);

  return (
    <div className="friend-detail-page">
      <div className="friend-detail-page__inner">
        {/* 상단 프로필 및 곡 정보 섹션 */}
        <div className="friend-detail-page__top">
          <button
            className="friend-detail-page__back"
            onClick={() => navigate(-1)}
          >
            ‹
          </button>

          <div className="friend-detail-page__profile">
            <div className="friend-detail-page__avatar">
              {friend?.profileImage ? (
                <img src={friend.profileImage} alt="profile" />
              ) : (
                <UserIcon />
              )}
            </div>
            <div className="friend-detail-page__profile-info">
              <div className="friend-detail-page__name">{friend?.name}</div>
              <div className="friend-detail-page__bio">{friend?.bio}</div>
            </div>
          </div>

          {/* 친구가 저장한 최근 곡 표시 영역 */}
          <div className="friend-detail-page__songs-inline">
            {latestSong ? (
              <div className="friend-detail-page__song-inline-item">
                <div className="friend-detail-page__song-inline-cover" />
                <div className="friend-detail-page__song-inline-info">
                  <div className="friend-detail-page__song-inline-title">{latestSong.title}</div>
                  <div className="friend-detail-page__song-inline-artist">{latestSong.artist}</div>
                </div>
              </div>
            ) : (
              <div>저장한 곡이 없습니다.</div>
            )}
          </div>
        </div>

        {/* 메인 콘텐츠: 캘린더와 할 일 목록을 가로로 배치 */}
        <div className="friend-detail-page__grid">
          <div className="friend-detail-page__calendar">
            <FriendCalendar
              initialDate={selectedDate}
              onDateChange={(date) => date && setSelectedDate(date)}
              todosByDate={todosByDate}
              remainingByDate={remainingByDate}
            />
          </div>

          <div className="friend-detail-page__todo">
            <FriendTodo
              title="To do List"
              todos={todos}
              categories={Categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 기본 유저 아이콘 SVG
function UserIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Z" fill="#ffffff" opacity="0.9" />
      <path d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default FriendDetailPage;
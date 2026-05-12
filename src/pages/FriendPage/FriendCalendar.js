import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import "../../styles/Calendar.css";

// 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환하는 헬퍼 함수
const toDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// 캘린더 타일에 표시할 데이터 (어떤 날에 할 일이 있는지 확인용)
const dummyTodosByDate = {
  "2026-05-04": [
    { id: 1, title: "프론트 보충자료 읽기", completed: true },
    { id: 2, title: "FriendCalendar 주석 달기", completed: false },
  ],
  "2026-05-06": [
    { id: 3, title: "친구 페이지 과제 제출", completed: true },
  ],
  "2026-05-10": [
    { id: 4, title: "React 복습하기", completed: false },
    { id: 5, title: "props 정리하기", completed: false },
    { id: 6, title: "useState 정리하기", completed: true },
  ],
};

export default function FriendCalendar() {
  // 사용자가 클릭하여 선택한 날짜를 관리하는 state입니다.
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 날짜가 클릭되었을 때 실행되는 함수입니다.
  const handleDateChange = (value) => {
    const next = value instanceof Date ? value : value?.[0];
    if (!next) return;
    setSelectedDate(next);
  };

  // 특정 날짜의 할 일 상태(개수, 완료 여부)를 파악하는 함수입니다.
  const getDayMeta = (date) => {
    const key = toDateKey(date);
    const list = dummyTodosByDate[key] ?? [];

    // 할 일이 없으면 기본값 반환
    if (list.length === 0) {
      return { hasTodos: false, remaining: 0, allDone: false };
    }

    // 남은 할 일 개수 계산
    const remaining = list.filter((todo) => !todo.completed).length;

    return {
      hasTodos: true,
      remaining,
      allDone: remaining === 0, // 남은 게 0개면 모두 완료
    };
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        calendarType="gregory"
        view="month"
        prev2Label={null} // 1년 전 이동 버튼 숨김
        next2Label={null} // 1년 후 이동 버튼 숨김
        showNeighboringMonth={true}
        formatDay={(locale, date) => String(date.getDate())}
        
        // 날짜 타일 안에 추가적인 내용을 그립니다 (숫자나 별 모양)
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          const { hasTodos, remaining, allDone } = getDayMeta(date);
          if (!hasTodos) return null;

          // 다 했으면 별(★), 남았으면 남은 개수를 숫자로 표시
          return <div className="tile-meta">{allDone ? "★" : remaining}</div>;
        }}

        // 날짜 타일에 조건부 클래스명을 부여하여 스타일을 변경합니다 (색상 등)
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";

          const { hasTodos, allDone } = getDayMeta(date);
          if (!hasTodos) return "";

          return allDone ? "tile-done" : "tile-has";
        }}
      />
    </div>
  );
}
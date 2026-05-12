import React, { useMemo } from "react";

import "../../styles/Todo.css";
import "../../styles/FriendTodo.css";

// 화면에 보여줄 임시 할 일(Todo) 데이터입니다.
const dummyTodos = [
  { id: 1, text: "프론트 보충자료 읽기", category: "공부", completed: true },
  { id: 2, text: "FriendTodo 구현하기", category: "공부", completed: false },
  { id: 3, text: "동아리 회의", category: "동아리", completed: false },
];

// 카테고리별로 적용할 색상 스타일 정보입니다.
const dummyCategories = {
  공부: { backgroundColor: "#E5F8F1", color: "#333" },
  일상: { backgroundColor: "#FFC8BE", color: "#333" },
  동아리: { backgroundColor: "#B6DAFF", color: "#333" },
};

// FriendTodo는 특정 친구의 할 일 목록을 보여주는 컴포넌트입니다.
const FriendTodo = ({ title = "To do List" }) => {
  const todos = dummyTodos;
  const categories = dummyCategories;

  // useMemo를 사용하여 전체 개수와 완료된 개수를 계산합니다.
  // todos가 변경될 때만 다시 계산하여 성능을 최적화합니다.
  const counts = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.completed).length;
    return { total, done };
  }, [todos]);

  return (
    <div className="friend-todo">
      <div className="todo-container">
        {/* 상단 타이틀 영역 */}
        <div className="todo-header">
          <div className="todo-title">{title}</div>
        </div>

        {/* 할 일 목록 영역 */}
        <div className="todo-list">
          {/* 할 일이 하나도 없을 때 보여줄 문구 */}
          {todos.length === 0 ? (
            <div className="friend-todo__empty">등록된 투두가 없습니다.</div>
          ) : (
            // map을 돌며 할 일 아이템을 하나씩 생성합니다.
            todos.map((t) => (
              <div key={t.id} className={`todo-item ${t.completed ? "done" : ""}`}>
                {/* 완료 여부에 따라 체크박스 스타일 변경 */}
                <div className={`checkbox ${t.completed ? "checked" : ""}`} />
                <div className="todo-text">{t.text}</div>
                {/* 카테고리 이름과 그에 맞는 배경색 적용 */}
                <div
                  className="todo-category"
                  style={categories[t.category] ?? undefined}
                >
                  {t.category}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendTodo;
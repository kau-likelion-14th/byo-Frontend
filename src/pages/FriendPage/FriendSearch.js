import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/FriendSearch.css";
import searchIcon from "../../assets/icon/search.png";

// 검색 대상이 될 전체 사용자 목록(더미 데이터)입니다.
const dummyUsers = [
    { id: "1", userId: 1, name: "나나", tag: "1234", bio: "안녕하세요!", profileImageUrl: null },
    { id: "2", userId: 2, name: "얀", tag: "2342", bio: "^^", profileImageUrl: null },
    { id: "3", userId: 3, name: "지말", tag: "1214", bio: "ㅎㅎ", profileImageUrl: null },
    { id: "4", userId: 4, name: "코다", tag: "1223", bio: ";ㅁ;", profileImageUrl: null },
    { id: "5", userId: 5, name: "딜런", tag: "1777", bio: ".", profileImageUrl: null },
];

function FriendSearch({
  title = "팔로우 요청",
  placeholder = "이름/태그로 검색",
  onFollow,
  followingList = [],
}) {
  const navigate = useNavigate();
  // 사용자가 입력창에 타이핑하는 내용을 저장하는 state입니다.
  const [query, setQuery] = useState("");

  // 현재 팔로우 중인 아이디들을 Set 형태로 변환하여 검색 결과에서 버튼 상태를 결정합니다.
  const followingIdSet = useMemo(() => {
    return new Set(followingList.map((x) => x.id));
  }, [followingList]);

  // 입력된 검색어(query)에 따라 유저 목록을 필터링합니다.
  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return []; // 검색어가 없으면 결과도 비웁니다.

    return dummyUsers.filter((user) => {
      return (
        user.name.includes(q) ||
        user.tag.includes(q) ||
        `${user.name}#${user.tag}`.includes(q)
      );
    });
  }, [query]);

  // 검색 결과 유저를 클릭했을 때 상세 페이지로 이동합니다.
  const goFriendDetail = (friend) => {
    navigate("/friends/detail", { state: { friend } });
  };

  return (
    <section className="friend-search">
      <h2 className="friend-search__title">{title}</h2>

      {/* 검색창 입력 영역 */}
      <div className="friend-search__input-box">
        <span className="friend-search__icon">
          <img src={searchIcon} alt="검색" className="friend-search__icon-img" />
        </span>
        <input
          className="friend-search__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
        />
      </div>

      {/* 검색 결과 리스트 표시 */}
      {query.trim() === "" ? null : results.length === 0 ? (
        <div className="friend-search__empty">검색 결과가 없습니다.</div>
      ) : (
        <ul className="friend-search__list">
          {results.map((user) => {
            // 이미 팔로우 중인 유저인지 확인
            const isFollowing = followingIdSet.has(user.id);

            return (
              <li key={user.id} className="friend-search__item">
                <div className="friend-search__left" onClick={() => goFriendDetail(user)}>
                  <div className="friend-avatar">
                    {user.profileImageUrl ? (
                      <img src={user.profileImageUrl} alt="" />
                    ) : (
                      <UserIcon />
                    )}
                  </div>
                  <div className="friend-info">
                    <div className="friend-info__top">
                      <span className="friend-info__name">{user.name}</span>
                      <span className="friend-info__tag">#{user.tag}</span>
                    </div>
                    <div className="friend-info__bio">{user.bio}</div>
                  </div>
                </div>

                {/* 팔로우 여부에 따라 버튼 텍스트와 비활성화 여부 결정 */}
                <button
                  type="button"
                  className={`friend-follow-btn ${isFollowing ? "is-disabled" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 클릭 이벤트(상세이동) 방지
                    onFollow?.(user);
                  }}
                  disabled={isFollowing}
                >
                  {isFollowing ? "팔로잉" : "팔로우"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function UserIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Z" fill="#ffffff" opacity="0.9" />
      <path d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default FriendSearch;
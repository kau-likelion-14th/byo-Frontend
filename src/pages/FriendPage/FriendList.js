// react-router-dom에서 페이지 이동을 위한 useNavigate를 가져옵니다.
// import는 다른 파일(또는 라이브러리)에서 필요한 기능을 가져와서 사용하는 것입니다.
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/image/delete.png";
import "../../styles/FriendList.css";

// FriendList는 부모(FriendPage)로부터 데이터를 받아서
// 화면(UI)을 그리는 역할을 하는 컴포넌트입니다.
// 즉, state는 부모가 관리하고, 이 컴포넌트는 props로 받아서 사용하는 구조입니다.
function FriendList(
  {
    title = "팔로우 목록",
    friends = [],
    onClickRemove,
    emptyText = "팔로우하는 친구가 없습니다.",
  }
) {
  // navigate는 다른 페이지로 이동할 때 사용하는 함수입니다.
  const navigate = useNavigate();

  // 친구를 클릭했을 때 실행되는 함수입니다.
  // 클릭한 친구의 id를 이용해서 상세 페이지로 이동합니다.
  // state로 friend 객체를 함께 넘겨 다음 페이지에서 사용할 수 있습니다.
  const goFriendDetail = (friend) => {
    navigate(`/friends/${friend.id}`, { state: { friend } });
  };

  return (
    <section className="friend-list">

      {/* props로 받은 title을 화면에 출력 */}
      <h2 className="friend-list__title">{title}</h2>

      {/* 친구 목록이 비어 있는지 확인 */}
      {friends.length === 0 ? (
        <div className="friend-list__empty">{emptyText}</div>
      ) : (
        <ul className="friend-list__items">

          {/* 배열 데이터를 map으로 돌면서 화면(UI)로 변환 */}
          {friends.map((friend) => (

            <li key={friend.id} className="friend-list__item">

              {/* 클릭 시 상세 페이지로 이동 */}
              <div
                className="friend-list__left"
                role="button"
                tabIndex={0}
                onClick={() => {
                  goFriendDetail(friend);
                }}
              >

                {/* 이미지가 있으면 이미지, 없으면 기본 아이콘 */}
                <div className="friend-avatar" aria-hidden="true">
                  {friend.profileImageUrl ? (
                    <img
                      className="friend-avatar__img"
                      src={friend.profileImageUrl}
                      alt="프로필 사진"
                    />
                  ) : (
                    <UserIcon />
                  )}
                </div>

                <div className="friend-info">
                  <div className="friend-info__top">
                    <span className="friend-info__name">{friend.name}</span>
                    <span className="friend-info__tag">#{friend.tag}</span>
                  </div>

                  {/* bio 유무에 따라 다르게 렌더링 */}
                  {friend.bio ? (
                    <div className="friend-info__bio">{friend.bio}</div>
                  ) : (
                    <div className="friend-info__empty">
                      소개글이 없습니다.
                    </div>
                  )}
                </div>
              </div>

              {/* 삭제 버튼 */}
              <button
                className="friend-remove-btn"
                type="button"
                aria-label="삭제"
                onClick={(e) => {
                  e.stopPropagation();

                  // 부모 컴포넌트로 "이 친구 삭제" 요청 전달
                  onClickRemove?.(friend);
                }}
              >
                <img
                  className="friend-remove-icon"
                  src={deleteIcon}
                  alt="삭제 아이콘"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// 기본 프로필 아이콘 (이미지가 없을 때 사용)
function UserIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Z"
        fill="#ffffff"
        opacity="0.9"
      />
      <path
        d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// export default는 이 파일의 대표 컴포넌트를 외부에서 사용할 수 있게 내보내는 것입니다.
// 다른 파일에서는 import FriendList from "./FriendList"; 형태로 가져와 사용할 수 있습니다.
export default FriendList;
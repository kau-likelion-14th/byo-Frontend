import React, { useEffect } from "react";
import "../../styles/FriendUnfollowModal.css";

// 친구 삭제(언팔로우) 확인을 요청하는 팝업창 컴포넌트입니다.
function FriendUnfollowModal({ isOpen, friend, onConfirm, onClose }) {
  
  // 모달이 열려 있을 때 ESC 키를 누르면 닫히도록 설정합니다.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // isOpen이 false면 아무것도 화면에 그리지 않습니다.
  if (!isOpen) return null;

  const displayName = friend?.name ?? "";
  const displayTag = friend?.tag ? `#${friend.tag}` : "";

  // 배경(오버레이)을 클릭했을 때 모달이 닫히도록 하는 함수입니다.
  const handleOverlayClick = (e) => {
    // 배경을 클릭했을 때만 닫히고, 중앙 콘텐츠 박스를 클릭할 땐 닫히지 않게 합니다.
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className="friend-unfollow-modal__overlay" onClick={handleOverlayClick}>
      <div className="friend-unfollow-modal__content" role="dialog">
        <p className="friend-unfollow-modal__text">
          <span className="friend-unfollow-modal__name">{displayName}</span>{" "}
          <span className="friend-unfollow-modal__tag">{displayTag}</span>
          님을 팔로우 목록에서
          <br />
          삭제하시겠습니까?
        </p>

        <div className="friend-unfollow-modal__actions">
          {/* 예 버튼을 누르면 부모의 handleConfirmRemove 실행 */}
          <button
            type="button"
            className="friend-unfollow-modal__btn friend-unfollow-modal__btn--yes"
            onClick={onConfirm}
          >
            예
          </button>

          {/* 아니오 버튼을 누르면 부모의 handleCloseModal 실행 */}
          <button
            type="button"
            className="friend-unfollow-modal__btn friend-unfollow-modal__btn--no"
            onClick={onClose}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendUnfollowModal;
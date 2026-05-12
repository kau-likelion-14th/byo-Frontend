import React from 'react';
import { useMemo, useState } from 'react';

import FriendList from './FriendList';
import FriendSearch from './FriendSearch';
import FriendUnfollowModal from './FriendUnfollowModal';

import '../../styles/FriendPage.css';

// 처음 화면에 보여줄 친구 목록 데이터입니다.
// 배열 안에 여러 개의 객체가 들어 있는 구조입니다.
// 각각의 객체 하나가 친구 한 명의 정보를 의미합니다.
const initialFollowList = [
    {
        id: "1",
        userId: 1,
        name: "나나",
        tag: "1234",
        bio: "안녕하세요! 저는 나나입니다.",
        profileImageUrl: null,
    },
    {
        id: "2",
        userId: 2,
        name: "얀",
        tag: "2342",
        bio: "^^",
        profileImageUrl: null,
    },
    {
        id: "3",
        userId: 3,
        name: "지말",
        tag: "1214",
        bio: "ㅎㅎ",
        profileImageUrl: null,
    },
    {
        id: "4",
        userId: 4,
        name: "코다",
        tag: "1223",
        bio: ";ㅁ;",
        profileImageUrl: null,
    },
    {
        id: "5",
        userId: 5,
        name: "딜런",
        tag: "1777",
        bio: ".",
        profileImageUrl: null,
    },
];

function FriendPage() {
    // followList는 현재 화면에 보여줄 친구 목록 state입니다.
    // 처음에는 initialFollowList가 들어갑니다.
    // 친구를 추가하거나 삭제하면 setFollowList로 값을 바꿉니다.
    // followList가 바뀌면 React가 화면을 다시 그리기 때문에
    // FriendList에 보이는 친구 목록도 자동으로 바뀝니다.
    const [followList, setFollowList] = useState(initialFollowList);

    // followIds는 현재 팔로우 중인 친구들의 id만 모아둔 값입니다.
    // followList 배열에서 친구 한 명씩 꺼낸 뒤 map을 이용해 id만 뽑습니다.
    // 이렇게 만들어두면 새로운 친구를 추가할 때
    // 이미 팔로우한 친구인지 확인할 수 있습니다.
    //
    // 주의: 현재 코드에서는 x.Id처럼 대문자 I를 사용하고 있습니다.
    // 위 데이터에는 id가 소문자이므로 실제로는 x.id가 맞습니다.
    const followIds = useMemo(
        () => new Set(followList.map((x) => x.Id)),
        [followList]
    );

    // isModalOpen은 언팔로우 확인 모달이 열렸는지 닫혔는지를 저장하는 state입니다.
    // 처음에는 false이므로 모달이 보이지 않습니다.
    // setIsModalOpen(true)가 실행되면 모달이 열리고,
    // setIsModalOpen(false)가 실행되면 모달이 닫힙니다.
    const [isModalOpen, setIsModalOpen] = useState(false);

    // selectedFriend는 현재 삭제하려고 선택한 친구를 저장하는 state입니다.
    // 처음에는 아무 친구도 선택하지 않았기 때문에 null입니다.
    // 삭제 버튼을 누르면 해당 친구 객체가 selectedFriend에 저장됩니다.
    // 모달은 이 값을 이용해서 어떤 친구를 삭제할지 알 수 있습니다.
    const [selectedFriend, setSelectedFriend] = useState(null);

    // FriendSearch에서 친구 추가 버튼을 눌렀을 때 실행될 함수입니다.
    // 이 함수는 아래 return 부분에서 FriendSearch에게 onFollow라는 props로 전달됩니다.
    // FriendSearch가 onFollow(user)를 실행하면 여기의 handleFollow가 실행됩니다.
    const handleFollow = (user) => {
        // user 데이터가 없거나 userId가 없으면 함수를 바로 종료합니다.
        // 잘못된 데이터가 들어왔을 때 친구 목록에 추가되지 않도록 막는 역할입니다.
        if (!user?.userId) return;

        // 이미 팔로우한 친구라면 함수를 종료합니다.
        // followIds 안에 user.userId가 이미 있으면 중복 추가하지 않습니다.
        if (followIds.has(String(user.userId))) return;

        // 기존 친구 목록 prev를 가져온 뒤,
        // 기존 배열을 복사하고 마지막에 새 user를 추가한 새 배열을 만듭니다.
        // 배열 state는 직접 push로 수정하지 않고
        // 이렇게 새로운 배열을 만들어 setFollowList로 바꿔야 합니다.
        // 이 코드가 실행되면 followList가 바뀌고,
        // React가 화면을 다시 그려서 친구 목록에 새 친구가 보이게 됩니다.
        setFollowList((prev) => [...prev, user]);
    };

    // FriendList에서 삭제 버튼을 눌렀을 때 실행될 함수입니다.
    // 이 함수는 FriendList에게 onClickRemove라는 props로 전달됩니다.
    // FriendList에서 onClickRemove(friend)를 실행하면
    // 삭제 버튼을 누른 친구 객체가 friend로 들어옵니다.
    const handleClickRemove = (friend) => {
        // 바로 삭제하지 않고, 먼저 어떤 친구를 삭제하려는지 저장합니다.
        // 그래야 모달에서 selectedFriend 정보를 사용할 수 있습니다.
        setSelectedFriend(friend);

        // 모달을 열기 위해 isModalOpen을 true로 바꿉니다.
        // 이 값이 true가 되면 FriendUnfollowModal에 isOpen={true}가 전달됩니다.
        setIsModalOpen(true);
    };

    // 모달에서 삭제 확인 버튼을 눌렀을 때 실행될 함수입니다.
    // 이 함수는 FriendUnfollowModal에게 onConfirm이라는 props로 전달됩니다.
    const handleConfirmRemove = () => {
        // selectedFriend가 없으면 삭제할 친구가 없다는 뜻이므로 함수를 종료합니다.
        if (!selectedFriend) return;

        // 기존 친구 목록 prev에서 selectedFriend와 id가 다른 친구들만 남깁니다.
        // filter는 조건을 만족하는 요소만 모아서 새 배열을 만듭니다.
        // 즉, 선택된 친구 한 명만 제외한 새 친구 목록을 만드는 코드입니다.
        //
        // 이 코드가 실행되면 followList가 새 배열로 바뀌고,
        // React가 화면을 다시 그리면서 삭제한 친구가 목록에서 사라집니다.
        setFollowList((prev) => 
            prev.filter((freind) => freind.id !== selectedFriend.id)
        );

        // 주의: freind는 friend의 오타로 보입니다.
        // 변수 이름이라 동작할 수는 있지만, 읽기 좋게 friend로 고치는 것이 좋습니다.

        // 삭제가 끝났으므로 모달을 닫습니다.
        setIsModalOpen(false);

        // 선택된 친구 정보도 비워줍니다.
        // 다음에 다시 모달을 열 때 이전 친구 정보가 남아 있지 않게 하기 위해서입니다.
        setSelectedFriend(null);
    };

    // 모달에서 취소하거나 닫을 때 실행될 함수입니다.
    // 실제 삭제는 하지 않고 모달만 닫고 선택된 친구 정보를 초기화합니다.
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFriend(null);
    };

    return (
        <div className="friend-page">
            <div className="friend-page__inner">
                <div className="friend-page__grid">
                    <FriendList
                        // followList state를 FriendList에게 friends라는 이름으로 전달합니다.
                        // FriendList 파일에서는 이 값을 friends로 받아서
                        // friends.map(...)을 이용해 친구 목록을 화면에 출력합니다.
                        friends={followList}

                        // handleClickRemove 함수를 FriendList에게 전달합니다.
                        // FriendList에서 삭제 버튼을 누르면 이 함수가 실행되고,
                        // 삭제하려는 친구가 selectedFriend에 저장된 뒤 모달이 열립니다.
                        onClickRemove={handleClickRemove}

                        // 친구 목록이 비어 있을 때 보여줄 문구입니다.
                        // FriendList에서는 friends.length가 0일 때 이 문구를 화면에 보여줍니다.
                        emptyText="팔로우하는 친구가 없습니다."
                    />

                    <FriendSearch
                        // handleFollow 함수를 FriendSearch에게 전달합니다.
                        // FriendSearch에서 팔로우 버튼을 누르면 이 함수가 실행되고,
                        // 새 친구가 followList에 추가됩니다.
                        onFollow={handleFollow}

                        // 현재 팔로우 중인 친구 목록을 FriendSearch에게 전달합니다.
                        // FriendSearch는 이 값을 이용해서 이미 팔로우한 친구인지 확인할 수 있습니다.
                        followingList={followList}
                    />
                </div>
            </div>

            <FriendUnfollowModal
                // isModalOpen state를 모달에게 전달합니다.
                // true이면 모달이 열리고, false이면 모달이 닫힙니다.
                isOpen={isModalOpen}

                // selectedFriend state를 모달에게 전달합니다.
                // 모달은 이 값을 이용해 어떤 친구를 삭제할지 알 수 있습니다.
                friend={selectedFriend}

                // 모달에서 확인 버튼을 눌렀을 때 실행할 함수를 전달합니다.
                // 실행되면 selectedFriend가 followList에서 제거됩니다.
                onConfirm={handleConfirmRemove}

                // 모달에서 취소 또는 닫기 버튼을 눌렀을 때 실행할 함수를 전달합니다.
                // 실행되면 삭제 없이 모달만 닫힙니다.
                onClose={handleCloseModal}
            />
        </div>
    );
}

export default FriendPage;
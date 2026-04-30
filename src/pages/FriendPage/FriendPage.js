import { react } from "react";
import { useMemo, useState } from "react";
import FriendList from "../../components/FriendList/FriendList";
import FriendSearch from "../../components/FriendSearch/FriendSearch";
import './FriendPage.css';
import FriendUnfollowModal from "../../components/FriendUnfollowModal/FriendUnfollowModal";

const initialFollowList = [
    {
        id: 1,
        userId: 1,
        name: "aa",
        tag: "1234",
        bio: "hello",
        profileImageUrl: null,
    },
    {
        id: 2,
        userId: 2,
        name: "bb",
        tag: "0000",
        bio: "hello",
        profileImageUrl: null,
    }
]

function FriendPage() {
    const [followList, setFollowList] = useState(initialFollowList);
    const handleFollow = (user) => {
        if (!user?.userId) return;
        if (followIds.has(String(user.userId))) return;
        setFollowList((prev) => [...prev, user])
    }
    const folloIds = useMemo(
        () => new Set (followList.map((x) => x.userId)),
        [followList]
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleClickRemove = (friend) => {
        setSelectedFriend(friend);
        setIsModalOpen(true);
    }
    const handleComfirmRemove = () => {
        if (!selectedFriend) return;
        setFollowList((prev) => 
            prev.filter((friend) => friend.userId !== selectedFriend.userId)
        );
        setIsModalOpen(false);
        setSelectedFriend(null);   
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFriend(null);
    }

    return (
        <div className = "friend-page">
            <div className = "friend-page__inner">
                <div className = "friend-page__grid">
                    <FriendList
                        friends={followList}
                        onClickRemove = {handleClickRemove}
                        emptyText="팔로우하는 친구가 없습니다." 
                    />
                    <FriendSearch
                        onFollow = {handleFollow}
                        followList = {followList}
                    />
                </div>
            </div>
            <FriendUnfollowModal
                isOpen = {isModalOpen}
                friend = {selectedFriend}
                onConfirm = {handleComfirmRemove}
                onClose = {handleCloseModal}
            />
        </div>

    );
}

export default FriendPage;
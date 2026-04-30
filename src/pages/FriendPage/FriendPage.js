import { react } from "react";
import { useMemo, useState } from "react";
import FriendList from "../../components/FriendList/FriendList";
import FriendSearch from "../../components/FriendSearch/FriendSearch";
import './FriendPage.css';

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
        setFollowList((prevlist) => [...prevlist, user])
    }
    const folloIds = useMemo(
        () => new Set (followList.map((x) => x.userId)),
        [followList]
    );

    return (
        <div>
            <FriendList
                friends={followList}
                emptyText="팔로우하는 친구가 없습니다." 
            />
            <FriendSearch
                onFollow = {handleFollow}
                followList = {followList}
            />
        </div>

    );
}

export default FriendPage;
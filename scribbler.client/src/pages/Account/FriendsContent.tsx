import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

import { AppUser } from "../../models/AppUser";
import { FriendRequest } from "../../models/FriendRequest";
import SentRequest from "./SentRequest";
import ReceivedRequest from "./ReceivedRequest";
import Icon from "../../components/Icon";
import FriendItem from "./FriendItem";
import AddFriendModal from "../../components/AddFriendModal";

function FriendsContent() {

    const [friends, setFriends] = useState<AppUser[] | null>(null);
    const [sentRequests, setSentRequests] = useState<FriendRequest[] | null>(null);
    const [receivedRequests, setReceievedRequests] = useState<FriendRequest[] | null>(null);

    const [showAddFriendModal, setShowAddFriendModal] = useState(false);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await fetch("/api/Friendship");
                if (!res.ok)
                    throw new Error("Failed to fetch friends");

                const data = await res.json();
                setFriends(data);
            } catch (err) {
                console.error("Error fetching friends:", err);
            }
        };

        const fetchSentRequests = async () => {
            try {
                const res = await fetch("/api/Friendship/Requests/Sent");
                if (!res.ok)
                    throw new Error("Failed to fetch sent requests");

                const data: FriendRequest[] = await res.json();
                setSentRequests(data);
            } catch (err) {
                console.error("Error fetching sent requests:", err);
            }
        };

        const fetchReceivedRequests = async () => {
            try {
                const res = await fetch("/api/Friendship/Requests/Received");
                if (!res.ok)
                    throw new Error("Failed to fetch received requests");

                const data: FriendRequest[] = await res.json();
                setReceievedRequests(data);
            } catch (err) {
                console.error("Error fetching received requests:", err);
            }
        };

        fetchFriends();
        fetchSentRequests();
        fetchReceivedRequests();
    }, []);

    const onCancelRequest = (requestId: number) => {
        setSentRequests((prevRequests) =>
            prevRequests ? prevRequests.filter(request => request.id !== requestId) : []
        );
    }

    const onRejectRequest = (requestId: number) => {
        setReceievedRequests((prevRequests) =>
            prevRequests ? prevRequests.filter(request => request.id !== requestId) : []
        );
    }

    const onAcceptRequest = (requestId: number, user: AppUser) => {
        setReceievedRequests((prevRequests) =>
            prevRequests ? prevRequests.filter(request => request.id !== requestId) : []
        );
        setFriends((prevFriends) => prevFriends ? [user, ...prevFriends] : [user]);
    }

    const onRemoveFriend = (friendId: string) => {
        setFriends((prevFriends) =>
            prevFriends ? prevFriends.filter(friend => friend.id !== friendId) : []
        );
    }

    const onRequestSent = (data: FriendRequest) => {
        if (sentRequests != null) {
            setSentRequests([...sentRequests, data])
        } else {
            setSentRequests([data])
        }
    }

    return (
        <>
            <AddFriendModal
                show={showAddFriendModal}
                onClose={() => setShowAddFriendModal(false)}
                onRequestSent={onRequestSent} />

            <div className="mb-5 mt-3 d-flex justify-content-between align-items-center">
                <h1 className="m-0">My Friends</h1>
                <Button variant="outline-primary" onClick={() => setShowAddFriendModal(true)}>
                    <Icon name="plus-circle" />
                </Button>
            </div>

            {
                receivedRequests != null && receivedRequests.length > 0 &&
                    <Card className="mb-3">
                        <Card.Header>
                            Received Requests
                        </Card.Header>
                        <ListGroup variant="flush">
                            {receivedRequests.map((request) => (
                                <ReceivedRequest
                                    key={request.id}
                                    friendRequest={request}
                                    onAcceptRequest={onAcceptRequest}
                                    onRejectRequest={onRejectRequest} />
                            ))}
                        </ListGroup>
                    </Card>
            }

            {
                sentRequests != null && sentRequests.length > 0 &&
                <Card className="mb-3">
                    <Card.Header>
                        Sent Requests
                    </Card.Header>
                    <ListGroup variant="flush">
                        {sentRequests.map((request) => (
                            <SentRequest key={request.id} friendRequest={request} onCancelRequest={onCancelRequest} />
                        ))}
                    </ListGroup>
                </Card>
            }

            <div>
                {friends?.map((friend) => (
                    <FriendItem key={friend.id} friend={friend} onRemoveFriend={onRemoveFriend} />
                ))}

                {friends?.length === 0 && (
                    <div className="mt-5 text-center">
                        <p>You have no friends yet. <Icon name="emoji-frown" /></p>
                    </div>
                ) }
            </div>
        </>
    );
}

export default FriendsContent;
import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

import { AppUser } from "../../models/AppUser";
import { FriendRequest } from "../../models/FriendRequest";
import SentRequest from "./SentRequest";
import ReceivedRequest from "./ReceivedRequest";
import Icon from "../../components/Icon";
import FriendItem from "./FriendItem";

interface RawSentFriendRequest {
    id: number;
    requestToUser: AppUser;
}

interface RawReceivedFriendRequest {
    id: number;
    requestFromUser: AppUser;
}

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

                const data: RawSentFriendRequest[] = await res.json();
                setSentRequests(data.map((request) => {
                    return { requestId: request.id, user: request.requestToUser };
                }));
            } catch (err) {
                console.error("Error fetching sent requests:", err);
            }
        };

        const fetchReceivedRequests = async () => {
            try {
                const res = await fetch("/api/Friendship/Requests/Received");
                if (!res.ok)
                    throw new Error("Failed to fetch received requests");

                const data: RawReceivedFriendRequest[] = await res.json();
                setReceievedRequests(data.map((request) => {
                    return { requestId: request.id, user: request.requestFromUser };
                }));
            } catch (err) {
                console.error("Error fetching received requests:", err);
            }
        };

        fetchFriends();
        fetchSentRequests();
        fetchReceivedRequests();
    }, []);


    return (
        <>
            <div className="mb-5 mt-3 d-flex justify-content-between align-items-center">
                <h1>My Friends</h1>
                <Button variant="outline-primary" onClick={() => setShowAddFriendModal(true)}>
                    <Icon name="plus-circle" />
                </Button>
            </div>

            {
                receivedRequests != null && receivedRequests.length > 0 &&
                    <Card>
                        <Card.Header>
                            Received Requests
                        </Card.Header>
                        <ListGroup variant="flush">
                            {receivedRequests.map((request) => (
                                <ReceivedRequest key={request.requestId} friendRequest={request} />
                            ))}
                        </ListGroup>
                    </Card>
            }

            {
                sentRequests != null && sentRequests.length > 0 &&
                <Card>
                    <Card.Header>
                        Sent Requests
                    </Card.Header>
                    <ListGroup variant="flush">
                        {sentRequests.map((request) => (
                            <SentRequest key={request.requestId} friendRequest={request} />
                        ))}
                    </ListGroup>
                </Card>
            }

            <div>
                {friends?.map((friend) => (
                    <FriendItem key={friend.id} friend={friend} />
                ))}

                {friends?.length === 0 && (
                    <div className="text-center">
                        <p>You have no friends yet.</p>
                        <Button variant="primary" onClick={() => setShowAddFriendModal(true)}>Click here to add one</Button>
                    </div>
                ) }
            </div>
        </>
    );
}

export default FriendsContent;
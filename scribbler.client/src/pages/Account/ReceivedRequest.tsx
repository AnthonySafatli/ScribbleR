import { useState } from "react";
import { Button, ListGroup, OverlayTrigger, Popover, Spinner } from "react-bootstrap";

import Icon from "../../components/Icon";
import { FriendRequest } from "../../models/FriendRequest";
import { AppUser } from "../../models/AppUser";
import UserInfo from "../../components/UserInfo";

interface Props {
    friendRequest: FriendRequest,
    onAcceptRequest: (requestId: number, user: AppUser) => void,
    onRejectRequest: (requestId: number) => void,
}

function ReceivedRequest({ friendRequest, onAcceptRequest, onRejectRequest }: Props) {

    const [acceptLoading, setAcceptLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const acceptRequest = async () => {
        setAcceptLoading(true);
        try {
            const res = await fetch(`/api/Friendship/Requests/${friendRequest.id}/Accept`, {
                method: "POST",
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send request");
            }

            onAcceptRequest(friendRequest.id, friendRequest.user);

        } catch (err: any) {
            console.error(err)
        } finally {
            setAcceptLoading(false);
        }
    }

    const declineRequest = async () => {
        setRejectLoading(true);
        try {
            const res = await fetch(`/api/Friendship/Requests/${friendRequest.id}/Reject`, {
                method: "POST",
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send request");
            }

            onRejectRequest(friendRequest.id);

        } catch (err: any) {
            console.error(err)
        } finally {
            setRejectLoading(false);
        }
    }

    return (
        <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Popover id="popover-basic"><Popover.Body><UserInfo userId={friendRequest.user.id} /></Popover.Body></Popover>}
                    >
                        <div>{friendRequest.user.displayName}</div>
                    </OverlayTrigger>
                </div>
                <div className="d-flex gap-1">
                    <Button variant="default" className="text-success" onClick={() => acceptRequest()}>
                        {
                            acceptLoading ? (
                                <Spinner size="sm" animation="border" />
                            ) : (
                                <Icon name="check" />
                            )
                        }
                    </Button>
                    <Button variant="default" className="text-danger" onClick={() => declineRequest()}>
                        {
                            rejectLoading ? (
                                <Spinner size="sm" animation="border" />
                            ) : (
                                <Icon name="x" />
                            )
                        }
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
    );
}

export default ReceivedRequest;
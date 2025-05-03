import { useState } from "react";
import { Button, ListGroup, Spinner } from "react-bootstrap";

import Icon from "../../components/Icon";
import { FriendRequest } from "../../models/FriendRequest";

interface Props {
    friendRequest: FriendRequest,
}

function ReceivedRequest({ friendRequest }: Props) {

    const [acceptLoading, setAcceptLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const acceptRequest = async () => {
        setAcceptLoading(true);
        try {
            const res = await fetch(`/api/Friendship/Requests/${friendRequest.requestId}/Accept`, {
                method: "POST",
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send request");
            }

        } catch (err: any) {
            console.error(err)
        } finally {
            setAcceptLoading(false);
        }
    }

    const declineRequest = async () => {
        setRejectLoading(true);
        try {
            const res = await fetch(`/api/Friendship/Requests/${friendRequest.requestId}/Reject`, {
                method: "POST",
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send request");
            }

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
                    {friendRequest.user.displayName}
                </div>
                <div className="d-flex gap-1">
                    <Button variant="success" onClick={() => acceptRequest()}>
                        {
                            acceptLoading ? (
                                <Spinner size="sm" animation="border" />
                            ) : (
                                <Icon name="check" />
                            )
                        }
                    </Button>
                    <Button variant="danger" onClick={() => declineRequest()}>
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
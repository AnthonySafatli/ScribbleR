import { useState } from "react";
import { Button, ListGroup, OverlayTrigger, Popover, Spinner } from "react-bootstrap";

import Icon from "../../components/Icon";
import { FriendRequest } from "../../models/FriendRequest";
import UserInfo from "../../components/UserInfo";

interface Props {
    friendRequest: FriendRequest,
    onCancelRequest: (requestId: number) => void,
}

function SentRequest({ friendRequest, onCancelRequest }: Props) {

    const [loading, setLoading] = useState(false);

    const cancelRequest = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/Friendship/Requests/" + friendRequest.id, {
                method: "DELETE",
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send request");
            }

            onCancelRequest(friendRequest.id);

        } catch (err: any) {
            console.error(err)
        } finally {
            setLoading(false);
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
                        <div>{friendRequest.user.displayName ?? friendRequest.user.userHandle}</div>
                    </OverlayTrigger>
                </div>
                <div>
                    <Button variant="default" className="text-danger" onClick={() => cancelRequest()}>
                        {
                            loading ? (
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

export default SentRequest;
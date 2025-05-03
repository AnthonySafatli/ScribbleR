import { useState } from "react";
import { Button, ListGroup, Spinner } from "react-bootstrap";

import Icon from "../../components/Icon";
import { FriendRequest } from "../../models/FriendRequest";

interface Props {
    friendRequest: FriendRequest,
}

function SentRequest({ friendRequest }: Props) {

    const [loading, setLoading] = useState(false);

    const cancelRequest = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/Friendship/Requests/" + friendRequest.requestId, {
                method: "DELETE",
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send request");
            }

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
                    {friendRequest.user.displayName}
                </div>
                <div>
                    <Button variant="danger" onClick={() => cancelRequest()}>
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
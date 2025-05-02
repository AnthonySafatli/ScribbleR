import { Button, ListGroup } from "react-bootstrap";

import Icon from "../../components/Icon";
import { FriendRequest } from "../../models/FriendRequest";

interface Props {
    friendRequest: FriendRequest,
}

function ReceivedRequest({ friendRequest }: Props) {

    const acceptRequest = async () => {
        // Cancel the request
    }

    const declineRequest = async () => {
        // Cancel the request
    }

    return (
        <ListGroup.Item>
            <div className="d-flex flex-space-between">
                <div>
                    {friendRequest.user.displayName}
                </div>
                <div className="d-flex">
                    <Button variant="success" onClick={() => acceptRequest()}>
                        <Icon name="check" />
                    </Button>
                    <Button variant="danger" onClick={() => declineRequest()}>
                        <Icon name="x" />
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
    );
}

export default ReceivedRequest;
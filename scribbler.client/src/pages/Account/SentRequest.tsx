import { Button, ListGroup } from "react-bootstrap";

import Icon from "../../components/Icon";
import { FriendRequest } from "../../models/FriendRequest";

interface Props {
    friendRequest: FriendRequest,
}

function SentRequest({ friendRequest }: Props) {

    const cancelRequest = async () => {
        // Cancel the request
    }

    return (
        <ListGroup.Item>
            <div className="d-flex flex-space-between">
                <div>
                    {friendRequest.user.displayName}
                </div>
                <div>
                    <Button variant="danger" onClick={() => cancelRequest()}>
                        <Icon name="x" />
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
    );
}

export default SentRequest;
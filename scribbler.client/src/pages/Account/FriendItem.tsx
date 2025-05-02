import { Button } from "react-bootstrap";

import { AppUser } from "../../models/AppUser";
import Icon from "../../components/Icon";

interface Props {
    friend: AppUser
}

function FriendItem({ friend }: Props) {

    const unfriend = async () => {
        // Unfriend the user
    }

    return (
        <div className="d-flex flex-space-between">
            <div>
                {friend.displayName}
            </div>
            <div>
                <Button variant="danger" onClick={() => unfriend()}>
                    <Icon name="person-slash" />
                </Button>
            </div>
        </div>
    );
}

export default FriendItem;
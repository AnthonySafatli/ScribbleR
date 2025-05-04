import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import { AppUser } from "../../models/AppUser";
import Icon from "../../components/Icon";

interface Props {
    friend: AppUser,
    onRemoveFriend: (friendId: string) => void
}

function FriendItem({ friend, onRemoveFriend }: Props) {

    const [loading, setLoading] = useState(false)

    const unfriend = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/Friendship/" + friend.id, {
                method: "DELETE",
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send request");
            }

            onRemoveFriend(friend.id)

        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div>
                {friend.displayName}
            </div>
            <div>
                <Button variant="default" className="text-danger" onClick={() => unfriend()}>
                    {
                        loading ? (
                            <Spinner size="sm" animation="border" />
                        ) : (
                            <Icon name="person-slash" />
                        )
                    }
                </Button>
            </div>
        </div>
    );
}

export default FriendItem;
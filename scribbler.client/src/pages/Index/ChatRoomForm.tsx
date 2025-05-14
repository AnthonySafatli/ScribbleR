import { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";

function ChatRoomForm() {

    const { user } = useAuthContext() as AuthContextData;

    const [roomId, setRoomId] = useState("");

    const goToChatRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.location.href = "/Chatroom/" + roomId
    }

    return (
        <Form onSubmit={goToChatRoom}>
            <div className="d-flex flex-column align-items-center gap-2">
                <div className="d-flex gap-3">
                    <Form.Control
                        style={{ width: '200px'}}
                        placeholder="Enter Room ID"
                        onChange={(event) => setRoomId(event.target.value.trim())}
                    />
                    {roomId && (
                        <Button variant="primary" type="submit" disabled={user === null ? true : false}>
                            Go To Room
                        </Button>
                    )}
                </div>
                {(roomId && !user) && (
                    <p className="small text-muted">You must sign in to enter a room!</p>
                )}
            </div>
        </Form>
    );
}

export default ChatRoomForm;

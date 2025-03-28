import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import RoomIdInput from "./RoomIdInput";

function ChatRoomForm() {
    const [roomId, setRoomId] = useState("");

    const goToChatRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.location.replace("/Chatroom/" + roomId)
    }

    return (
        <Form onSubmit={goToChatRoom}>
            <Row>
                <Col>
                    <RoomIdInput onContentChange={setRoomId} />
                </Col>
                {roomId && (
                    <Col>
                        <div>
                            <Button variant="primary" type="submit">
                                Go To Room
                            </Button>
                        </div>
                    </Col>
                )}
            </Row>
        </Form>
    );
}

export default ChatRoomForm;

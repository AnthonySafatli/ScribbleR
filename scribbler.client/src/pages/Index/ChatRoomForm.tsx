import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import RoomIdInput from "./RoomIdInput";
import RoomIdSubmit from "./RoomIdSubmit";

function ChatRoomForm() {
    const [roomId, setRoomId] = useState("");

    return (
        <Form>
            <Row>
                <Col>
                    <RoomIdInput onContentChange={setRoomId} />
                </Col>
                {roomId && (
                    <Col>
                        <RoomIdSubmit />
                    </Col>
                )}
            </Row>
        </Form>
    );
}

export default ChatRoomForm;

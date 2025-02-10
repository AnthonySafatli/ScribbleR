import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import RoomIdInput from "./RoomIdInput";
import RoomIdSubmit from "./RoomIdSubmit";

function ChatRoomForm() {
    const [hasContent, setHasContent] = useState(false);

    return (
        <Form>
            <Row>
                <Col>
                    <RoomIdInput onContentChange={setHasContent} />
                </Col>
                {hasContent && (
                    <Col>
                        <RoomIdSubmit />
                    </Col>
                )}
            </Row>
        </Form>
    );
}

export default ChatRoomForm;
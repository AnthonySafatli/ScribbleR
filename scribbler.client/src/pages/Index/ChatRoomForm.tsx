import { Col, Form, Row } from "react-bootstrap";

function ChatRoomForm() {


    return (
        <Form>
            <Row>
                <Col>
                    <Form.Control placeholder="Enter Room ID" />
                </Col>
            </Row>
        </Form>
    );
}

export default ChatRoomForm;
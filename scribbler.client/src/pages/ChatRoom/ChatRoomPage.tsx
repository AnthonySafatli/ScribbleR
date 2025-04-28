import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

import NotFound from "../NotFound";
import SignalRConnections from "../../models/SignalRConnections";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";
import { Message } from "../../models/Message";
import Icon from "../../components/Icon";
import DrawCanvas from "./DrawCanvas";

function ChatRoomPage() {
    const { chatroomId } = useParams();
    const { user } = useAuthContext() as AuthContextData;

    const [isConnected, setIsConnected] = useState(false);
    const [conn, setConnection] = useState<HubConnection | null>(null);
    const [typedMessage, setTypedMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        if (user && !isConnected) {
            setIsConnected(true);
            const connect = async () => {
                try {
                    const newConn = new HubConnectionBuilder()
                        .withUrl("https://localhost:44389/api/chat")
                        .build();

                    newConn.on(SignalRConnections.RECEIVE_MESSAGE, (displayName: string, userId: string, msg: string, isJoinOrLeave: boolean | null) => {
                        const newMsg = {
                            displayName: displayName,
                            userId: userId,
                            message: msg,
                            isSystem: isJoinOrLeave !== null,
                            isJoin: isJoinOrLeave === true,
                        };
                        setMessages(prevMessages => [...prevMessages, newMsg]);
                    });

                    newConn.on(SignalRConnections.CHATROOM_USER_COUNT, (count: number) => {
                        setUserCount(count);
                    });

                    await newConn.start();
                    await newConn.invoke(SignalRConnections.JOIN_CHATROOM, {
                        chatroom: chatroomId,
                        displayName: user?.displayName,
                        userId: user?.id,
                    });

                    setConnection(newConn);
                } catch (e) {
                    console.error(e);
                    // TODO: Handle error
                }
            };

            connect();
        }
    }, [user, chatroomId, isConnected]);

    const sendMessage = () => {
        if (conn && typedMessage.trim()) {
            conn.invoke(SignalRConnections.SEND_MESSAGE, typedMessage);
            setTypedMessage("");
        }
    };

    function renderMessage(msg: Message) {
        if (msg.isSystem) {
            return (
                <Alert variant="info" className="mt-2 mb-0">
                    <b>{msg.displayName}</b>{(msg.isJoin ? " has joined the chat" : " has left the chat")}
                </Alert>
            );

        }

        return (
            <Alert variant="secondary" className="mt-2 mb-0">
                <b>{msg.displayName}</b>: {msg.message}
            </Alert>
        );
    }

    if (chatroomId === undefined) {
        return <NotFound />;
    }

    return (
        <main>
            <Container>
                <div className="vh-100 d-flex flex-column">
                    <div className="sticky-top mt-5">
                        <div className="d-flex justify-content-around align-items-center">
                            <h1 className="text-center">Chat Room</h1>
                            <div><Icon name="person-circle" /> {userCount}</div>
                        </div>
                    </div>
                    <div className="d-flex flex-column overflow-auto" style={{ flexGrow: 1, justifyContent: "flex-end", overflowY: 'auto', padding: '1rem' }}>
                        { messages.map((msg, i) => (<div key={i}>{renderMessage(msg)}</div>))}
                    </div>
                        
                    {/* 

                    This is for typing messages

                    <div className="mt-2">
                        <Form.Control
                            as="textarea"
                            rows={5}
                            style={{ resize: "none", width: "100%" }}
                            value={typedMessage}
                            onChange={(e) => setTypedMessage(e.target.value)}
                        />
                    </div>

                    */}

                    <div>
                        <DrawCanvas />
                    </div>
                    <Row className="my-2">
                        <Col>
                            <Button className="w-100" variant="primary"><Icon name="trash3" /></Button>
                        </Col>
                        <Col>
                            <Button className="w-100" variant="primary"><Icon name="journal-arrow-down" /></Button>
                        </Col>
                        <Col>
                            <Button className="w-100" variant="primary" onClick={sendMessage}><Icon name="journal-arrow-up" /></Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </main>

    );
}

export default ChatRoomPage;

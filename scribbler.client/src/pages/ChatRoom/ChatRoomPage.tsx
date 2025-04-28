import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import NotFound from "../NotFound";
import SignalRConnections from "../../models/SignalRConnections";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";
// import { Message } from "../../models/Message";

interface MessageSimple {
    displayName: string;
    message: string;
}

function ChatRoomPage() {
    const { chatroomId } = useParams();
    const { user } = useAuthContext() as AuthContextData;

    const [isConnected, setIsConnected] = useState(false);
    const [conn, setConnection] = useState<HubConnection | null>(null);
    const [typedMessage, setTypedMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageSimple[]>([]);

    useEffect(() => {
        if (user && !isConnected) {
            setIsConnected(true);
            const connect = async () => {
                try {
                    const newConn = new HubConnectionBuilder()
                        .withUrl("https://localhost:44389/api/chat")
                        .build();

                    newConn.on(SignalRConnections.JOIN_CHATROOM, (userId: string, msg: string) => {
                        const msgObj = { displayName: "System", message: msg };
                        setMessages(prevMessages => [...prevMessages, msgObj]);
                    });
                    newConn.on(SignalRConnections.SEND_MESSAGE, (displayName: string, msg: string) => {
                        const msgObj = { displayName: displayName, message: msg };
                        setMessages(prevMessages => [...prevMessages, msgObj]);
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

    if (chatroomId === undefined) {
        return <NotFound />;
    }

    return (
        <main>
            <Container>
                <div className="vh-100 d-flex flex-column justify-content-center">
                    <div className="d-flex flex-column" style={{ flexGrow: 1, justifyContent: "flex-end" }}>
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.displayName}</strong> {msg.message}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Form.Control
                            as="textarea"
                            rows={5}
                            style={{ resize: "none", width: "100%" }}
                            value={typedMessage}
                            onChange={(e) => setTypedMessage(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-around gap-2 my-4">
                        <Button variant="primary" onClick={sendMessage}>Send!</Button>
                        <Button variant="primary">Clear!</Button>
                    </div>
                </div>
            </Container>
        </main>
    );
}

export default ChatRoomPage;

import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";

import NotFound from "../NotFound";
import SignalRConnections from "../../models/SignalRConnections";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";
import { Message } from "../../models/Message";
import Icon from "../../components/Icon";
import DrawCanvas from "../../components/DrawCanvas";
import MessageCard from "./MessageCard";
import ToolBar from "./ToolBar";
import MessageMode from "../../models/MessageMode";

function ChatRoomPage() {
    const { chatroomId } = useParams();
    const { user } = useAuthContext() as AuthContextData;

    const [isConnected, setIsConnected] = useState(false);
    const [conn, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userCount, setUserCount] = useState(0);

    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    const [messageMode, setMessageMode] = useState<MessageMode>(MessageMode.Draw);
    const [colour, setColour] = useState<string>("#000000");
    const [typedMessage, setTypedMessage] = useState<string>("");

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        switch (messageMode) {
            case MessageMode.Draw:
                canvasRef.current?.eraseMode(false);
                break;
            case MessageMode.Erase:
                canvasRef.current?.eraseMode(true);
                break;
            case MessageMode.Text:
                break;
        }
    }, [messageMode])

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
                            paths: null,
                            message: msg,
                            isSystem: isJoinOrLeave !== null,
                            isJoin: isJoinOrLeave === true,
                        };
                        setMessages(prevMessages => [...prevMessages, newMsg]);
                    });

                    newConn.on(SignalRConnections.CHATROOM_USER_COUNT, (count: number) => {
                        setUserCount(count);
                    });

                    newConn.on(SignalRConnections.RECEIVE_SKETCH, (displayName: string, userId: string, paths: CanvasPath[]) => {
                        const newMsg = {
                            displayName: displayName,
                            userId: userId,
                            paths: paths,
                            message: null,
                            isSystem: false,
                            isJoin: false
                        }
                        setMessages(prevMessages => [...prevMessages, newMsg]);
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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const copyCanvas = async (copyRef: ReactSketchCanvasRef | null) => {
        const paths = await copyRef?.exportPaths()
        if (paths) {
            clearCanvas();
            canvasRef.current?.loadPaths(paths);
        }
    }

    const clearCanvas = () => {
        canvasRef.current?.clearCanvas();
    };

    const saveDrawing = async () => {
        const paths = await canvasRef.current?.exportPaths();

        if (conn && paths) {
            conn.invoke(SignalRConnections.SEND_SKETCH, paths);
            clearCanvas();
        }
    };

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
                    <div className="d-flex flex-column overflow-auto flex-grow-1 p-1">
                        {messages.map((msg, i) => (
                            <div key={i}><MessageCard message={msg} onCopy={copyCanvas} /></div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div>
                        <ToolBar
                            mode={messageMode}
                            setMode={setMessageMode}
                            colour={colour}
                            setColour={setColour} />
                    </div>
                    <div>
                        {
                            messageMode === MessageMode.Text ?
                                <Form.Control
                                    as="textarea"
                                    style={{ resize: "none", width: "100%", height: "200px" }}
                                    value={typedMessage}
                                    onChange={(e) => setTypedMessage(e.target.value)}
                                />
                                :
                                <DrawCanvas ref={canvasRef} colour={colour} />
                        }
                    </div>
                    <Row className="my-2">
                        <Col xs={8}>
                            You are sending messages as <strong><a href="/Account">{user?.displayName}</a></strong>
                        </Col>
                        <Col xs={2}>
                            <Button className="w-100" variant="primary" onClick={clearCanvas}><Icon name="trash3" /></Button>
                        </Col>
                        <Col xs={2}>
                            <Button className="w-100" variant="primary" onClick={saveDrawing}><Icon name="upload" /></Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </main>

    );
}

export default ChatRoomPage;

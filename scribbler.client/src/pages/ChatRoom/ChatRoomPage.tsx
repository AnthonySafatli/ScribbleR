import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useLocation, useParams } from "react-router-dom";
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

    const location = useLocation();
    const { chatroomId } = useParams();
    const { user } = useAuthContext() as AuthContextData;

    const [isConnected, setIsConnected] = useState(false);
    const [conn, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userCount, setUserCount] = useState(0);

    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    const [messageMode, setMessageMode] = useState<MessageMode>(MessageMode.Draw);
    const [typedMessage, setTypedMessage] = useState<string>("");

    const [colour, setColour] = useState<string>("#000000");
    const [size, setSize] = useState<number>(4);

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

                    newConn.on(SignalRConnections.RECEIVE_MESSAGE, (displayName: string, userId: string, msg: string, isJoinOrLeave: boolean | null, datetime: string) => {
                        const newMsg = {
                            displayName: displayName,
                            userId: userId,
                            paths: null,
                            message: msg,
                            isSystem: isJoinOrLeave !== null,
                            isJoin: isJoinOrLeave === true,
                            datetime: new Date(datetime)
                        };
                        setMessages(prevMessages => [...prevMessages, newMsg]);
                    });

                    newConn.on(SignalRConnections.CHATROOM_USER_COUNT, (count: number) => {
                        setUserCount(count);
                    });

                    newConn.on(SignalRConnections.RECEIVE_SKETCH, (displayName: string, userId: string, paths: CanvasPath[], datetime: string) => {
                        const newMsg = {
                            displayName: displayName,
                            userId: userId,
                            paths: paths,
                            message: null,
                            isSystem: false,
                            isJoin: false,
                            datetime: new Date(datetime)
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
        if (messageMode === MessageMode.Text) {
            sendTextMessage();
        } else {
            sendDrawing();
        }
    }

    const sendTextMessage = () => {
        if (conn && typedMessage.trim()) {
            conn.invoke(SignalRConnections.SEND_MESSAGE, typedMessage, Date.now());
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

    const sendDrawing = async () => {
        const paths = await canvasRef.current?.exportPaths();

        if (conn && paths) {
            conn.invoke(SignalRConnections.SEND_SKETCH, paths, Date.now());
            clearCanvas();
        }
    };

    const share = () => {
        navigator.clipboard.writeText(location.pathname)
            .then(() => console.log("Copied!"))
            .catch(err => console.error("Failed to copy: ", err));
    }

    if (chatroomId === undefined) {
        return <NotFound />;
    }

    return (
        <main>
            <Container>
                <div className="vh-100 d-flex flex-column">
                    <div className="sticky-top mt-5 mb-2">
                        <div className="d-flex justify-content-around align-items-center">
                            <div className="d-flex gap-3 align-items-center">
                                <div className="mr-3"><Icon name="person-circle" /> {userCount}</div>
                                <h1 className="text-center">Chatroom</h1>
                                <h2 className="text-muted">{chatroomId}</h2>
                            </div>
                            <div>
                                <Button variant="default" onClick={() => share()}><Icon name="box-arrow-up" /></Button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column overflow-auto flex-grow-1 p-1">
                        {messages.map((msg, i) => (
                            <div key={i}><MessageCard message={msg} onCopy={copyCanvas} /></div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <div style={{ maxWidth: "600px", width: "100%" }}>
                            <ToolBar
                                mode={messageMode}
                                setMode={setMessageMode}
                                colour={colour}
                                setColour={setColour}
                                size={size}
                                setSize={setSize}
                                undo={() => canvasRef?.current?.undo()}
                                redo={() => canvasRef?.current?.redo()} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div>
                            {
                                messageMode === MessageMode.Text ?
                                    <Form.Control
                                        as="textarea"
                                        style={{ resize: "none", width: "400px", height: "200px" }}
                                        value={typedMessage}
                                        onChange={(e) => setTypedMessage(e.target.value)}
                                    />
                                    :
                                    <DrawCanvas
                                        ref={canvasRef}
                                        colour={colour}
                                        size={size} />
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Row className="my-2" style={{ maxWidth: "800px", width: "100%" }}>
                            <Col xs={8}>
                                You are sending messages as <strong><a href="/Account">{user?.displayName}</a></strong>
                            </Col>
                            <Col xs={4}>
                                <div className="d-flex gap-2">
                                    <Button style={{ width: '100%' }} variant="primary" onClick={clearCanvas}><Icon name="trash3" /></Button>
                                    <Button style={{ width: '100%' }} variant="primary" onClick={sendMessage}><Icon name="upload" /></Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </main>

    );
}

export default ChatRoomPage;

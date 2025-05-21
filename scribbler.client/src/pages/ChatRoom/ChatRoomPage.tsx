import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import { ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";

import NotFound from "../NotFound";
import SignalRConnections from "../../models/SignalRConnections";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";
import { Message } from "../../models/Message";
import Icon from "../../components/Icon";
import DarkModeToggle from "../../components/DarkModeToggle";
import DrawCanvas from "../../components/DrawCanvas";
import MessageCard from "./MessageCard";
import ToolBar from "./ToolBar";
import MessageMode from "../../models/MessageMode";
import { NormalizePaths } from "../../utils/ScalePaths";
import { Bounce, toast } from "react-toastify";
import UserInfo from "../../components/UserInfo";

function ChatRoomPage() {

    const location = useLocation();
    const { chatroomId } = useParams();
    const { user } = useAuthContext() as AuthContextData;

    const isConnRef = useRef(false);
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
        if (user && isConnRef.current == false) {
            isConnRef.current = true;
            const connect = async () => {
                try {
                    const newConn = new HubConnectionBuilder()
                        .withUrl("/api/chat")
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
                        displayName: user?.displayName ?? user?.userHandle,
                        userId: user?.id,
                    });

                    setConnection(newConn);
                } catch (e) {
                    console.error(e);
                    toast.error("Failed to connect to chatroom, try again later", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            };

            connect();
        }
    }, [user, chatroomId]);

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
            conn.invoke(SignalRConnections.SEND_SKETCH, NormalizePaths(paths, 200, 400), Date.now());
            clearCanvas();
        }
    };

    const share = () => {
        navigator.clipboard.writeText(location.pathname)
            .then(() => toast.info('Chatroom URL has been copied to clipboard', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            }))
            .catch(err => console.error("Failed to copy: ", err));
    }

    if (chatroomId === undefined) {
        return <NotFound />;
    }

    return (
        <main>
            <Container>
                <div className="vh-100 d-flex flex-column">
                    <div className="sticky-top mt-4 mb-2">
                        <a href="/" className="text-reset text-decoration-none">
                            <Icon name="arrow-left" /> Back to Home
                        </a>
                        <div className="d-flex justify-content-around align-items-center">
                            <div>
                                <div className="d-flex gap-3 align-items-center mt-3">
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip>
                                                {userCount === 1
                                                    ? "You are the only one in the chatroom"
                                                    : `${userCount} people are currently in the chatroom`}
                                            </Tooltip>
                                        }
                                    >
                                        <div className="mr-3">
                                            <Icon name="person-circle" /> {userCount}
                                        </div>
                                    </OverlayTrigger>

                                    <h1 className="text-center">Chatroom</h1>
                                    <h2 className="text-muted">{chatroomId}</h2>
                                </div>
                            </div>
                            <div>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Copy the url for the chatroom</Tooltip>}>
                                    <Button variant="default" onClick={() => share()}><Icon name="box-arrow-up" /></Button>
                                </OverlayTrigger>
                                <DarkModeToggle />
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
                                You are sending messages as&nbsp;
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Popover id="popover-basic"><Popover.Body><UserInfo userId={user?.id ?? ""} /></Popover.Body></Popover>}
                                >
                                    <a href="/Account">{user?.displayName ?? user?.userHandle}</a>
                                </OverlayTrigger>
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

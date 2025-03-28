import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import SendButton from "./SendButton";
import ClearButton from "./ClearButton";
import NotFound from "../NotFound";
import SignalRConnections from "../../models/SignalRConnections";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";

function ChatRoomPage() {

    const { chatroomId } = useParams();

    const { user } = useAuthContext() as AuthContextData;

    const [conn, setConnection] = useState<HubConnection | null>(null);

    const joinedChatRoom = (msg: string, userId: string) => {
        console.log("msg: ", msg);
        console.log("user: ", userId);
    }

    const connectToChatRoom = async () => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl("https://localhost:44389/api/chat")
                .build();

            conn.on(SignalRConnections.TEST_JOIN, joinedChatRoom);

            await conn.start();
            await conn.invoke(SignalRConnections.TEST_JOIN, chatroomId, user?.displayName, user?.id); 

            setConnection(conn);
        } catch (e) {
            console.error(e);
        }
    };

    const [canvasClear, setCanvasClear] = useState(false);

    function requestCanvasClear() {
        setCanvasClear(!canvasClear);
    }

    if (chatroomId === undefined) {
        return <NotFound />
    }

    return (
        <main>
            <Container>
                <div className="vh-100 d-flex flex-column justify-content-center">
                    <div className="d-flex flex-column-reverse" style={{ flexGrow: "1" }}>
                    </div>
                    <div className="mt-4">
                        <Form.Control as="textarea" rows={5} style={{ resize: "none", width: "100%" }}></Form.Control>
                    </div>
                    <div className="d-flex justify-content-around gap-2 my-4">
                        <Button onClick={connectToChatRoom}>Join {chatroomId}</Button>
                        <SendButton />
                        <ClearButton onClear={requestCanvasClear} />
                    </div>
                </div>
            </Container>
        </main>
    );
}

export default ChatRoomPage;

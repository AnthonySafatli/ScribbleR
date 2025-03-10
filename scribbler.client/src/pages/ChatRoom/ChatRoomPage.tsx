import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import SendButton from "./SendButton";
import ClearButton from "./ClearButton";

function ChatRoomPage() {
    const [conn, setConnection] = useState<HubConnection | null>(null);

    const joinChatRoom = async (chatroom: string) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl("https://localhost:44389/api/chat")
                .configureLogging(LogLevel.Debug)
                .build();

            conn.on("TestJoin", (msg: string) => { 
                console.log("msg: ", msg);
            });

            await conn.start();
            await conn.invoke("TestJoin", chatroom); 

            setConnection(conn);
        } catch (e) {
            console.error(e);
        }
    };

    const [canvasClear, setCanvasClear] = useState(false);

    function requestCanvasClear() {
        setCanvasClear(!canvasClear);
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
                        <Button onClick={() => joinChatRoom("Test")}>Join</Button>
                        <SendButton />
                        <ClearButton onClear={requestCanvasClear} />
                    </div>
                </div>
            </Container>
        </main>
    );
}

export default ChatRoomPage;

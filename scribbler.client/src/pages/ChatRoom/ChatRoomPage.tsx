import { useState } from "react";
import { Container } from "react-bootstrap";

import DrawCanvas from "./DrawCanvas";
import SendButton from "./SendButton";
import ClearButton from "./ClearButton";

function ChatRoomPage() {

    const [canvasClear, setCanvasClear] = useState(false);

    function requestCanvasClear() {
        setCanvasClear(!canvasClear);
    }

    return (
        <main>
            <Container>
                <div className="d-flex flex-column justify-content-center">
                    <DrawCanvas cleared={canvasClear} />

                    <div className="d-flex justify-content-around gap-2 my-4">
                        <SendButton />
                        <ClearButton onClear={requestCanvasClear} />
                    </div>
                </div>
            </Container>
        </main>
    );
}

export default ChatRoomPage;
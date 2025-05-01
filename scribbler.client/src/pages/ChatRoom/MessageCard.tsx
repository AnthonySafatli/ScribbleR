import { useRef } from 'react';
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { Alert, Card } from 'react-bootstrap'; 

import { Message } from '../../models/Message';
import DrawCanvas from './DrawCanvas';

interface Props {
    message: Message
}

const MessageCard = ({ message }: Props) => {
    const drawingRef = useRef<ReactSketchCanvasRef>(null);

    if (message.paths) {
        return (
            <Card className="shader-sm mt-2 mb-0">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="m-0">Anthony Safatli</p>
                        <small className="text-muted">2:14 PM</small>
                    </div>
                    <div>
                        <DrawCanvas ref={drawingRef} paths={message.paths} />
                    </div>
                </Card.Body>
            </Card>
        );
    }

    if (message.isSystem) {
        return (
            <Alert variant="info" className="mt-2 mb-0">
                <b>{message.displayName}</b>{(message.isJoin ? " has joined the chat" : " has left the chat")}
            </Alert>
        );
    }

    return (
        <Alert variant="secondary" className="mt-2 mb-0">
            <b>{message.displayName}</b>: {message.message}
        </Alert>
    );
}

export default MessageCard;

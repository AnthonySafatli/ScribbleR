import { useRef } from 'react';
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { Alert, Button, Card } from 'react-bootstrap'; 

import { Message } from '../../models/Message';
import DrawCanvas from '../../components/DrawCanvas';
import Icon from '../../components/Icon';

interface Props {
    message: Message,
    onCopy: (copyRef: ReactSketchCanvasRef | null) => void,
}

const MessageCard = ({ message, onCopy }: Props) => {
    const drawingRef = useRef<ReactSketchCanvasRef>(null);

    if (message.paths) {
        return (
            <Card className="shader-sm mt-2 mb-0">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <p className="m-0">Anthony Safatli</p>
                            <small className="text-muted m-0">2:14 PM</small>
                        </div>
                        <div>
                            <Button variant="default" onClick={() => onCopy(drawingRef?.current)}>
                                <Icon name="copy" />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <DrawCanvas
                            ref={drawingRef}
                            paths={message.paths}
                            isDrawable={false} />
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

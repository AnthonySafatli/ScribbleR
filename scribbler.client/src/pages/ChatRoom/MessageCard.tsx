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

    // TODO: Fix hard coded values

    if (message.paths) {
        return (
            <div className="d-flex justify-content-center">
                <Card className="shader-sm mt-2 mb-0" style={{ maxWidth: "700px", width: "100%" }}>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <p className="m-0">{ message.displayName }</p>
                                <small className="text-muted m-0">2:14 PM</small> 
                            </div>
                            <div>
                                <Button variant="default" onClick={() => onCopy(drawingRef?.current)}>
                                    <Icon name="copy" />
                                </Button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <DrawCanvas
                                ref={drawingRef}
                                paths={message.paths}
                                isDrawable={false} />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    if (message.isSystem) {
        return (
            <div className="d-flex justify-content-center">
                <Alert variant="info" className="mt-2 mb-0" style={{ maxWidth: "700px", width: "100%" }}>
                    <b>{message.displayName}</b>{(message.isJoin ? " has joined the chat" : " has left the chat")}
                </Alert>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center">
            <Card className="shader-sm mt-2 mb-0" style={{ maxWidth: "700px", width: "100%" }}>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <p className="m-0">{ message.displayName }</p>
                            <small className="text-muted m-0">2:14 PM</small> 
                        </div>
                        <div>
                            <Button variant="default" onClick={() => onCopy(drawingRef?.current)}>
                                <Icon name="copy" />
                            </Button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div style={{ height: '200px', width: '400px', border: '1px solid black' }}>
                            <p className="m-0">{message.message}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default MessageCard;

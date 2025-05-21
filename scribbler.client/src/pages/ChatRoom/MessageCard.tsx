import { useRef } from 'react';
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { Alert, Button, Card, OverlayTrigger, Popover } from 'react-bootstrap'; 
import { formatDistanceToNow } from 'date-fns';

import { Message } from '../../models/Message';
import DrawCanvas from '../../components/DrawCanvas';
import Icon from '../../components/Icon';
import UserInfo from '../../components/UserInfo';

interface Props {
    message: Message,
    onCopy: (copyRef: ReactSketchCanvasRef | null) => void,
}

const MessageCard = ({ message, onCopy }: Props) => {

    const drawingRef = useRef<ReactSketchCanvasRef>(null);

    function PrettyDate(datetime: Date) {
        return <small className="text-muted m-0">{formatDistanceToNow(datetime, { addSuffix: true })}</small>;
    }

    if (message.paths) {
        return (
            <div className="d-flex justify-content-center">
                <Card className="shader-sm mt-2 mb-0" style={{ maxWidth: "700px", width: "100%" }}>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                                {PrettyDate(message.datetime)}
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Popover id="popover-basic"><Popover.Body><UserInfo userId={message.userId} /></Popover.Body></Popover>}
                                >
                                    <p className="m-0">{message.displayName}</p>
                                </OverlayTrigger>
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
                <Alert variant="secondary" className="mt-2 mb-0" style={{ maxWidth: "700px", width: "100%" }}>
                    <div>
                        { PrettyDate(message.datetime) }
                    </div>
                    <div>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Popover id="popover-basic"><Popover.Body><UserInfo userId={message.userId} /></Popover.Body></Popover>}
                        >
                            <b>{message.displayName}</b>
                        </OverlayTrigger>
                        {(message.isJoin ? " has joined the chat" : " has left the chat")}
                    </div>
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
                            {PrettyDate(message.datetime)}
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Popover id="popover-basic"><Popover.Body><UserInfo userId={message.userId} /></Popover.Body></Popover>}
                            >
                                <p className="m-0">{message.displayName}</p>
                            </OverlayTrigger>
                        </div>
                        <div>
                            <Button variant="default" onClick={() => onCopy(drawingRef?.current)}>
                                <Icon name="copy" />
                            </Button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="border border-dark p-3 overflow-auto" style={{ height: '200px', width: '400px' }}>
                            <pre style={{ fontFamily: 'inherit', margin: '0', padding: '0' }}>{message.message}</pre> 
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default MessageCard;

import { Button } from "react-bootstrap";

import Icon from "../../components/Icon";

interface Props {
    isDrawing: boolean;
    setDrawing: (isDrawing: boolean) => void;
}

function ToolBar({isDrawing, setDrawing}: Props) {

    const drawModeClick = (setToDraw: boolean) => {
        if (setToDraw == isDrawing)
            return;
        setDrawing(setToDraw);
    }

    return (
        <div className="d-flex gap-2 mb-2">
            <Button variant={isDrawing ? "primary" : "default"}
                    style={{ width: '50px', height: '50px' }}
                    onClick={() => drawModeClick(true)}>
                <Icon name="pen" />
            </Button>
            <Button variant={isDrawing ? "default" : "primary"}
                    style={{ width: '50px', height: '50px' }}
                    onClick={() => drawModeClick(false)}>
                <Icon name="eraser" />
            </Button>
        </div>
    );
}

export default ToolBar;
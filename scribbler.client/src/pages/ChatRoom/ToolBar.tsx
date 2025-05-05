import { Button } from "react-bootstrap";

import Icon from "../../components/Icon";
import ToolBarToggle from "./ToolBarToggle";

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

    const drawModeOptions = [
        {
            label: "draw",
            icon: "pen",
            onSelected: () => drawModeClick(true)
        },
        {
            label: "eraser",
            icon: "eraser",
            onSelected: () => drawModeClick(false)
        },
        {
            label: "text",
            icon: "fonts",
            onSelected: () => {  }
        }
    ]

    return (
        <div className="d-flex gap-2 mb-2">
            <ToolBarToggle options={drawModeOptions} />
        </div>
    );
}

export default ToolBar;
import { Button } from "react-bootstrap";
import ColourPickerPopup from "../../components/ColourPickerPopup";
import MessageMode from "../../models/MessageMode";
import ToolBarSizePicker from "./ToolBarSizePicker";
import ToolBarToggle from "./ToolBarToggle";
import Icon from "../../components/Icon";

interface Props {
    mode: MessageMode,
    setMode: (mode: MessageMode) => void,
    colour: string,
    setColour: (colour: string) => void,
    size: number,
    setSize: (size: number) => void,
    undo: () => void,
    redo: () => void,
}

function ToolBar({ mode, setMode, colour, setColour, size, setSize, undo, redo }: Props) {

    const drawModeOptions = [
        {
            label: "draw",
            icon: "pen",
            onSelected: () => setMode(MessageMode.Draw),
            value: MessageMode.Draw
        },
        {
            label: "eraser",
            icon: "eraser",
            onSelected: () => setMode(MessageMode.Erase),
            value: MessageMode.Erase
        },
        {
            label: "text",
            icon: "fonts",
            onSelected: () => setMode(MessageMode.Text),
            value: MessageMode.Text
        }
    ]

    return (
        <div className="d-flex gap-2 mb-2 justify-content-between">
            <div className="d-flex gap-2">
                <ToolBarToggle selectedValue={mode} options={drawModeOptions} />
                <ColourPickerPopup colour={colour} setColour={setColour} />
                <ToolBarSizePicker size={size} setSize={setSize} />
            </div>
            <div className="d-flex gap-2">
                <Button variant="primary" style={{ width: "50px", height: "50px" }} onClick={() => undo()}>
                    <Icon name="arrow-90deg-left" />
                </Button>
                <Button variant="primary" style={{ width: "50px", height: "50px" }} onClick={() => redo()}>
                    <Icon name="arrow-90deg-right" />
                </Button>
            </div>
        </div>
    );
}

export default ToolBar;
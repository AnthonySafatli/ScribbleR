import ColourPickerPopup from "../../components/ColourPickerPopup";
import MessageMode from "../../models/MessageMode";
import ToolBarSizePicker from "./ToolBarSizePicker";
import ToolBarToggle from "./ToolBarToggle";

interface Props {
    mode: MessageMode,
    setMode: (mode: MessageMode) => void,
    colour: string,
    setColour: (colour: string) => void,
    size: number,
    setSize: (size: number) => void,
}

function ToolBar({ mode, setMode, colour, setColour, size, setSize }: Props) {

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
        <div className="d-flex gap-2 mb-2">
            <ToolBarToggle selectedValue={mode} options={drawModeOptions} />
            <ColourPickerPopup colour={colour} setColour={setColour} />
            <ToolBarSizePicker size={size} setSize={setSize} />
        </div>
    );
}

export default ToolBar;
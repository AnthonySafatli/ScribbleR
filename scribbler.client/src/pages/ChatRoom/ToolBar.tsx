import MessageMode from "../../models/MessageMode";
import ToolBarToggle from "./ToolBarToggle";

interface Props {
    mode: MessageMode,
    setMode: (mode: MessageMode) => void
}

function ToolBar({ mode, setMode }: Props) {

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
        </div>
    );
}

export default ToolBar;
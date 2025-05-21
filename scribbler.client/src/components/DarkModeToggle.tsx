import { Button } from "react-bootstrap";
import Icon from "./Icon";
import { useColourMode, ColourMode } from "../context/ColourModeContext";

function DarkModeToggle() {

    const { isDark, setIsDark } = useColourMode() as ColourMode;

    return (
        <Button variant="default" onClick={() => setIsDark(prev => !prev)}>
            <Icon name={isDark ? "sun" : "moon"} />
        </Button>
    );
}

export default DarkModeToggle;

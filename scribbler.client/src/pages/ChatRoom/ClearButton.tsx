import { Button } from "react-bootstrap";

interface Props {
    onClear: () => void;
}

function ClearButton({ onClear }: Props) {

    return (
        <Button variant="primary" onClick={onClear}>
            Clear!
        </Button>
    );
}

export default ClearButton;
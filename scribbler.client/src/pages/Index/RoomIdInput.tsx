import { Form } from "react-bootstrap";

interface Props {
    onContentChange: (roomId: string) => void;
}

function RoomIdInput({ onContentChange }: Props) {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onContentChange(event.target.value.trim());
    };

    return (
        <Form.Control
            placeholder="Enter Room ID"
            onChange={handleInputChange}
        />
    );
}

export default RoomIdInput;

import { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";

interface Props {
    show: boolean;
    onClose?: () => void;
    onRequestSent?: () => void;
}

const AddFriendModal = ({ show, onClose, onRequestSent }: Props) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSendRequest = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch("/api/Friendship/Requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send request");
            }

            setSuccess("Friend request sent!");
            setUsername("");
            onRequestSent?.();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setUsername("");
        setError(null);
        setSuccess(null);
        setLoading(false);
        onClose?.();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Friend</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="username">
                    <Form.Label>Friend's Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                    />
                </Form.Group>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSendRequest} disabled={loading || !username}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Send Request"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddFriendModal;

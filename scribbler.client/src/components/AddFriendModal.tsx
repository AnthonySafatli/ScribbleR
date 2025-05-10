import { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";

import { FriendRequest } from "../models/FriendRequest";

interface Props {
    show: boolean;
    onClose: () => void;
    onRequestSent?: (request: FriendRequest) => void;
}

const AddFriendModal = ({ show, onClose, onRequestSent }: Props) => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendRequest = async () => {
        setLoading(true);

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

            const data = await res.json();

            toast.info('Friend request sent!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            setUsername("");
            onRequestSent?.(data);
        } catch (err: any) {
            console.log(err)
            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setUsername("");
        setLoading(false);
        onClose();
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
                        type="email"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSendRequest} disabled={loading || !username}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Send Request"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddFriendModal;

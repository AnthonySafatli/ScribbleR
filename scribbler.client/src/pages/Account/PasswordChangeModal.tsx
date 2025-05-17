import { useState } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';

import PasswordInput from "../../components/PasswordInput"
import ExtractErrorMessages from "../../utils/ErrorUtils"

interface Props {
    show: boolean;
    onClose: () => void;
}

function PasswordChangeModal({ show, onClose }: Props) {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[] | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "password")
            setPassword(value);
        if (name === "newPassword")
            setNewPassword(value);
    };

    const handleSubmit = async () => {

        setLoading(true);
        setErrors(null);
        setSuccess(false);

        try {
            const response = await fetch("/api/auth/changepassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword: password,
                    newPassword: newPassword
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                setErrors(ExtractErrorMessages(errorData) as string[]);
                const msg = "Failed to change password.";
                throw new Error(msg);
            }

            setSuccess(true);
            setPassword("");
            setNewPassword("");

            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 1500);
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {success && <Alert variant="success">Password changed successfully.</Alert>}

                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3">
                        <Form.Label name="password">Current Password</Form.Label>
                        <PasswordInput handleChange={handleChange} name="password" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label name="newPassword">New Password</Form.Label>
                        <PasswordInput handleChange={handleChange} name="newPassword" />
                    </Form.Group>
                </Form>

                {errors && errors.map((err) => <p className="mb-1 text-danger">{err}</p>)}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => handleSubmit()}
                    disabled={loading || !password || !newPassword}
                >
                    {loading ? <Spinner size="sm" animation="border" /> : "Change Password"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PasswordChangeModal;
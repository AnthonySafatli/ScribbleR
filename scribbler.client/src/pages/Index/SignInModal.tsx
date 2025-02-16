import { Button, Form, Modal } from "react-bootstrap";

interface Props {
    show: boolean,
    onClose: () => void
}

function SignInModal({ show, onClose }: Props) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Text>Enter email to sign in or sign up!</Form.Text>
                    <Form.Group className="my-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            id="email"
                            placeholder="name@email.com"
                            autoFocus />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Check
                            type="checkbox"
                            id="rememberMe"
                            label="Remember Me" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer >
                <Button variant="primary">Sign In</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignInModal;
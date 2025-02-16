import { useState } from "react";

import { Alert, Button, Form, Modal } from "react-bootstrap";

interface Props {
    show: boolean,
    onClose: () => void
}

function SignInModal({ show, onClose }: Props) {

    // state variables for input fields
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberme, setRememberme] = useState<boolean>(false);

    // state variable for error messages
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState<string>("");

    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email")
            setEmail(value);
        if (name === "password")
            setPassword(value);
        if (name === "rememberme")
            setRememberme(e.target.checked);
    };

    // handle submit event for the form
    const handleSubmit = () => {
        // validate email and passwords
        if (!email || !password) {
            setError("Please fill in all fields.");
            setShowAlert(true);
        } else {
            // clear error message
            setError("");
            setShowAlert(false)

            let loginurl = "";
            if (rememberme == true)
                loginurl = "/login?rememberme=true";
            else
                loginurl = "/login?rememberme=false";

            // post data to the /register api
            fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }).then((data) => {
                // handle success or error from the server
                console.log(data);
                if (data.ok) {
                    setError("Successful Login.");
                    setShowAlert(true);
                    window.location.href = '/';
                }
                else {
                    setError("Error Logging In.");
                    setShowAlert(true);
                }

            }).catch((error) => {
                // handle network error
                console.error(error);
                setError("Error Logging in.");
                setShowAlert(true);
            });
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            {error}
                        </Alert>
                    )}

                    <Form.Text>Enter email to sign in or sign up!</Form.Text>
                    <Form.Group className="my-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@email.com"
                            onChange={handleChange}
                            autoFocus />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Check
                            type="checkbox"
                            name="rememberme"
                            id="rememberme"
                            onChange={handleChange}
                            label="Remember Me" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer >
                <Button variant="primary" onClick={handleSubmit}>Sign In</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignInModal;
import { useState } from "react";

import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";

interface Props {
    show: boolean,
    onClose: () => void
}

function SignInModal({ show, onClose }: Props) {

    // state variables for input fields
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberme, setRememberme] = useState<boolean>(false);

    // state variables for alert messages
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState<string>("");

    // state variables for loading
    const [loadingEmailConfirm, setLoadingEmailConfirm] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

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

    const formError = (alertMessage: string) => {
        setError(alertMessage);
        setLoadingSubmit(false);
        setShowAlert(true);
    }

    // handle submit event for the form
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingSubmit(true);

        // validate email and passwords
        if (!email || !password) {
            formError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");
            setShowAlert(false);
            setLoadingSubmit(true);

            let loginurl = "";
            if (rememberme == true)
                loginurl = "/login?useCookies=true";
            else
                loginurl = "/login?useSessionCookies=true";

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
                    window.location.href = '/';
                }
                else {
                    formError("Error Logging In.");
                }

            }).catch((error) => {
                // handle network error
                console.error(error);
                formError("Error Logging in.");
            });
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            {error}
                        </Alert>
                    )}

                    <Form.Text>Enter email to sign in or sign up!</Form.Text>
                    <Form.Group className="my-3">
                        <Form.Label>Email Address</Form.Label>
                        <div className="d-flex justify-content-center align-items-center gap-4">
                            <Form.Control
                                type="email"
                                name="email"
                                id="email"
                                placeholder="name@email.com"
                                onChange={handleChange}
                                autoFocus />
                            {loadingEmailConfirm && (
                                <Spinner animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )}
                        </div>
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
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <Button variant="primary" type="submit">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <span>Sign In</span>
                                {loadingSubmit && (
                                    <Spinner animation="border" role="status" size="sm">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                )}
                            </div>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignInModal;
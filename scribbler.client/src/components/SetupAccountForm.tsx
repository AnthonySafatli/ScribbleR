import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContextData } from "../models/AppUser";

function SignInForm() {

    const { user, setUser } = useAuthContext() as AuthContextData;

    const [userHandle, setUserHandle] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [aboutMe, setAboutMe] = useState("");

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [alertError, setAlertError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "userHandle")
            setUserHandle(value);
        if (name === "displayName")
            setDisplayName(value);
        if (name === "aboutMe")
            setAboutMe(value);
    };

    const handleFormError = (alertMessage: string) => {
        setAlertError(alertMessage);
        setLoadingSubmit(false);
    }

    const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingSubmit(true);

        if (!userHandle) {
            handleFormError("User Handle can not be empty");
        }

        if (userHandle.length > 50) {
            handleFormError("User Handle can not be greater than 50 characters");
        }

        if (!displayName) {
            handleFormError("Display Name can not be empty");
        }

        if (displayName.length > 50) {
            handleFormError("Display Name can not be greater than 50 characters");
        }

        if (aboutMe.length > 200) {
            handleFormError("About Me can not be greater than 200 characters");
        }

        try {
            const res = await fetch('/api/account/setup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userHandle: userHandle,
                    displayName: displayName,
                    aboutMe: aboutMe
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
                return;
            } else {
                const warning = await res.text();
                throw new Error(warning || "Error Setting Up Account");
            }
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                handleFormError(error.message);
            } else {
                handleFormError("An unknown error occurred");
            }
        }

    } 

    return (
        <Form onSubmit={handleSaveChanges}>
            {alertError && (
                <Alert variant="danger" onClose={() => setAlertError(null)} dismissible>
                    {alertError}
                </Alert>
            )}

            <Form.Text>You must setup your account before continuing!</Form.Text>

            <Form.Group className="my-3">
                <Form.Label>User Handle <span className="text-danger">*</span></Form.Label>
                <Form.Control
                    type="text"
                    name="userHandle"
                    id="userHandle"
                    onChange={handleChange}
                    placeholder="The unique name others will identify you with" />
            </Form.Group>

            <Form.Group className="my-3">
                <Form.Label>Display Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                    type="text"
                    name="displayName"
                    id="displayName"
                    onChange={handleChange}
                    placeholder="The name others will see" />
            </Form.Group>

            <Form.Group className="my-3">
                <Form.Label>About Me</Form.Label>
                <Form.Control
                    as="textarea"
                    name="aboutMe"
                    id="aboutMe"
                    onChange={handleChange}
                    placeholder="Write a little bit about yourself (optional)" />
            </Form.Group>

            <div className="d-flex align-items-center justify-content-center gap-2">
                <Button variant="primary" type="submit">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <span>Save Changes</span>
                        {loadingSubmit && (
                            <Spinner animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                    </div>
                </Button>
            </div>
        </Form>
    );
}

export default SignInForm;
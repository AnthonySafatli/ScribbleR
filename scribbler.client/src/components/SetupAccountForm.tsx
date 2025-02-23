import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";


interface Props {
    onFormSubmit: () => void,
    userId: string | undefined
}

function SignInForm({ onFormSubmit, userId }: Props) {

    const [displayName, setDisplayName] = useState("");
    const [aboutMe, setAboutMe] = useState("");

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [alertError, setAlertError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "displayName")
            setDisplayName(value);
        if (name === "aboutMe")
            setAboutMe(value);
    };

    const handleFormError = (alertMessage: string) => {
        setAlertError(alertMessage);
        setLoadingSubmit(false);
    }

    const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingSubmit(true);

        if (!displayName) {
            handleFormError("Display Name can not be empty");
        }

        if (displayName.length > 50) {
            handleFormError("Display Name can not be greater than 50 characters");
        }

        if (aboutMe.length > 200) {
            handleFormError("About Me can not be greater than 200 characters");
        }

        fetch('/account/setup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userId,
                displayName: displayName,
                aboutMe: aboutMe
            }),
        }).then(res => {
            console.log(res)
        })

        onFormSubmit();
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
                <Form.Label>Display Name <span style={{color: 'red'}}>*</span></Form.Label>
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
                    type="textarea"
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
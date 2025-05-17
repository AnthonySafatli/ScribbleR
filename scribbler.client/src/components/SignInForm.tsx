import { JSX, useState, useEffect } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ExtractErrorMessages from "../utils/ErrorUtils";

interface Props {
    closeToggle: boolean,
    onSignedIn: () => void
}

function SignInForm({ closeToggle, onSignedIn }: Props) {

    // state variables for input fields
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberme, setRememberme] = useState<boolean>(false);

    // state variable for error message
    const [alertError, setAlertError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>("");
    const [passwordErrors, setPasswordErrors] = useState<string[] | null>(null)

    // state variables for submit button
    const [isRegister, setIsRegister] = useState<boolean | null>(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    useEffect(() => {
        setAlertError(null);
        setEmailError(null);
        setPasswordErrors(null);
        setIsRegister(null);
    }, [closeToggle])

    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "password")
            setPassword(value);
        if (name === "rememberme")
            setRememberme(e.target.checked);
    };

    const handleFormError = (alertMessage: string) => {
        setAlertError(alertMessage);
        setLoadingSubmit(false);
    }

    // handle submit event for the form
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // setup
        setAlertError(null);
        setEmailError(null);
        setPasswordErrors(null);
        setLoadingSubmit(true);

        // make sure email is validated
        if (isRegister == null) {
            handleFormError("Enter valid email.")
            return;
        }

        // input validation
        if (!email || !password) {
            handleFormError("Please fill in all fields.");
            return;
        }

        // register of needed
        let registerSuccess = false;
        if (isRegister == true) {
            try {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                })

                if (res.ok) {
                    registerSuccess = true;
                } else {
                    const data = await res.json();

                    console.log(data)

                    if (data.errors.InvalidEmail) {
                        setEmailError("Invalid Email!")
                        data.errors.InvalidEmail = null;
                    }
                    if (data.errors.DuplicateUserName) {
                        setEmailError("Username Taken. Try again!")
                        data.errors.DuplicateUserName = null;
                    }
                    setPasswordErrors(ExtractErrorMessages(data))

                    throw new Error(data.title)
                }
            } catch (error: unknown) {
                // handle network error
                console.error(error);
                if (error instanceof Error) {
                    handleFormError(error.message);
                } else {
                    handleFormError("An unknown error occurred");
                }
            }
        }

        if (isRegister && !registerSuccess) {
            setLoadingSubmit(false);
            return;
        }

        // login
        let loginurl = "";
        if (rememberme == true)
            loginurl = "/api/auth/login?useCookies=true";
        else
            loginurl = "/api/auth/login?useSessionCookies=true";

        // post data to the /register api
        let signedIn = false;
        fetch(loginurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then((response) => {
            // handle success or error from the server
            if (response.ok) {
                signedIn = true;
                onSignedIn();
                return;
            }
            else {
                return response.json();
            }
        }).then((data) => {
            if (signedIn)
                return;

            if (data.status == 401)
                handleFormError("Incorrect email or password!");
            else
                throw new Error("Error logging in");
        }).catch((error) => {
            // handle network error
            console.error(error);
            handleFormError(error.message);
        });
    };

    return (
        <Form onSubmit={handleLogin}>
            {alertError && (
                <Alert variant="danger" onClose={() => setAlertError(null)} dismissible>
                    {alertError}
                </Alert>
            )}

            <Form.Text>Enter email and password to sign in or sign up!</Form.Text>
            <Form.Group className="my-3">
                <Form.Label>Email Address</Form.Label>
                <EmailInput setEmail={setEmail} handleResult={setIsRegister} setError={setEmailError} />
                {emailError && (
                    <small className="text-danger d-block">{emailError}</small>
                )}
            </Form.Group>
            <Form.Group className="my-3">
                <Form.Label>Password</Form.Label>
                <PasswordInput handleChange={handleChange} />
                {passwordErrors && passwordErrors.map((err) => <p className="mb-1 text-danger">{err}</p>)}
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
                <Button variant="primary" type="submit" disabled={isRegister == null}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <span>{isRegister ? "Sign Up!" :
                            isRegister == false ? "Sign in!" :
                                "Sign in or up"}</span>
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
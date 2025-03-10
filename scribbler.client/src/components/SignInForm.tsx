import { JSX, useState, useEffect } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

import EmailInput from "./EmailInput";

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
    const [passwordError, setPasswordError] = useState<JSX.Element | null>(null)

    // state variables for submit button
    const [isRegister, setIsRegister] = useState<boolean | null>(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    useEffect(() => {
        setAlertError(null);
        setEmailError(null);
        setPasswordError(null);
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
        setPasswordError(null);
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
            await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }).then((response) => {
                if (response.ok) {
                    registerSuccess = true;
                    return;
                }
                return response.json();
            }).then((data) => {
                if (registerSuccess)
                    return;

                setPasswordError(
                    <>
                        {data.errors.PasswordRequiresLower && (
                            <small className="text-danger d-block">Password must contain at least one lowercase!</small>
                        )}
                        {data.errors.PasswordRequiresNonAlphanumeric && (
                            <small className="text-danger d-block">Passwords must have at least one special character!</small>
                        )}
                        {data.errors.PasswordRequiresUpper && (
                            <small className="text-danger d-block">Password must contain at least one uppercase!</small>
                        )}
                        {data.errors.PasswordTooShort && (
                            <small className="text-danger d-block">Password must be at least 6 characters!</small>
                        )}
                    </>
                )
                if (data.errors.InvalidEmail)
                    setEmailError("Invalid Email!")
                if (data.errors.DuplicateUserName)
                    setEmailError("Username Taken. Try again!")

                throw new Error(data.title)
            }).catch((error) => {
                // handle network error
                console.error(error);
                handleFormError(error.message);
                return;
            });
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
                <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="Enter Password" />
                {passwordError && (
                    passwordError
                )}
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
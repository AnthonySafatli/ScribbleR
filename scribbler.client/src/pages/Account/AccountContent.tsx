import { useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Form, InputGroup, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { ReactSketchCanvasRef } from "react-sketch-canvas";

import Icon from "../../components/Icon";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";
import PfpCanvas from "./PfpCanvas";
import { NormalizePaths } from "../../utils/ScalePaths";

function AccountContent() {

    const { user, setUser } = useAuthContext() as AuthContextData;

    const [displayName, setDisplayName] = useState<string>(user?.displayName ?? "");
    const [aboutMe, setAboutMe] = useState<string>(user?.aboutMe ?? "");

    const pfpRef = useRef<ReactSketchCanvasRef>(null);

    useEffect(() => {
        setDisplayName(user?.displayName ?? "")
        setAboutMe(user?.aboutMe ?? "")
    }, [user]);

    useEffect(() => {
        if (pfpRef && user?.profilePicture) {
            pfpRef?.current?.loadPaths(user?.profilePicture);
        }
    }, [user, pfpRef])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "displayName")
            setDisplayName(value);
        if (name === "aboutMe")
            setAboutMe(value);
    };

    // Submit Status
    const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);
    const [successFormSubmit, setSuccessFormSubmit] = useState(false);

    // Errors
    const [alertError, setAlertError] = useState<string | null>("");
    const [submitError, setSubmitError] = useState<string | null>("");

    const handleAccountSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitError(null);

        if (!displayName) {
            setAlertError("Display Name cannot be empty!");
            return;
        }

        setLoadingFormSubmit(true);
        setSuccessFormSubmit(false);
        setSubmitError(null)
        try {
            const paths = await pfpRef?.current?.exportPaths();
            const normPaths = NormalizePaths(paths, 200, 200);

            const res = await fetch('/api/account/edit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    displayName: displayName,
                    aboutMe: aboutMe,
                    profilePicture: normPaths ?? [],
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data)
                setLoadingFormSubmit(false);
                setSuccessFormSubmit(true);
            } else {
                throw new Error("Error Saving Changes!");
            }
        } catch (error: unknown) {
            console.error(e);
            if (error instanceof Error) {
                setSubmitError(error.message);
            } else {
                setSubmitError("An unknown error occurred");
            }
            setLoadingFormSubmit(false);
        }
    };

    return (
        <>
            <h1 className="mb-5 mt-3">My Account</h1>

            {alertError && (
                <Alert variant="danger" onClose={() => setAlertError(null)} dismissible>
                    {alertError}
                </Alert>
            )}

            <Form onSubmit={handleAccountSave}>
                <Row>
                    <Col xs={2}>
                        <div className="d-flex align-items-center h-100">
                            <Form.Label className="mb-0">User Handle</Form.Label>
                        </div>
                    </Col>
                    <Col className="p-2">
                        <InputGroup>
                            <InputGroup.Text>@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={user?.userHandle}
                                disabled />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <div className="d-flex align-items-center h-100">
                            <Form.Label className="mb-0">Email</Form.Label>
                        </div>
                    </Col>
                    <Col className="p-2">
                        <Form.Control
                            type="text"
                            value={user?.email}
                            disabled />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <div className="d-flex align-items-center h-100">
                            <Form.Label className="mb-0">Display Name</Form.Label>
                        </div>
                    </Col>
                    <Col className="p-2">
                        <Form.Control
                            type="text"
                            name="displayName"
                            id="displayName"
                            onChange={handleChange}
                            value={displayName} 
                            placeholder="Enter your preferred display name" />
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col xs={2}>
                        <div className="d-flex align-items-center h-100">
                            <Form.Label className="mb-0">About Me</Form.Label>
                        </div>
                    </Col>
                    <Col className="py-2">
                        <Form.Control
                            as="textarea"
                            name="aboutMe"
                            id="aboutMe"
                            onChange={handleChange}
                            value={aboutMe} 
                            placeholder="Share something interesting about yourself!" />
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col xs={2}>
                        <div className="d-flex align-items-center h-100">
                            <Form.Label className="mb-0">Profile Picture</Form.Label>
                        </div>
                    </Col>
                    <Col className="py-2">
                        <PfpCanvas ref={pfpRef} />
                    </Col>
                </Row>
                <Form.Group>
                    <div className="d-flex justify-content-between align-items-center">
                        
                        <Button variant="outline-primary" type="submit" className="px-4">
                            Save Changes
                        </Button>

                        {loadingFormSubmit && (
                            <Spinner animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                        {successFormSubmit && (
                            <Icon name="check-circle-fill" colour="success" />
                        )}
                        {submitError && (
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                    <Tooltip id="button-tooltip">
                                        { submitError }
                                    </Tooltip>
                                }
                            >
                                <div>
                                    <Icon name="x-circle-fill" colour="danger" />
                                    <span className="visually-hidden">{submitError }</span>
                                </div>
                            </OverlayTrigger>
                        )}
                    </div>
                </Form.Group>
            </Form>
        </>
    );
}

export default AccountContent;

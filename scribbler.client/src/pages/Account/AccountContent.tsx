import { useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Form, InputGroup, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";
import { SketchPicker, ColorResult } from "react-color";

import Icon from "../../components/Icon";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";
import DrawCanvas from "../../components/DrawCanvas";

function AccountContent() {

    const { user, setUser } = useAuthContext() as AuthContextData;

    const [displayName, setDisplayName] = useState<string>(user?.displayName ?? "");
    const [aboutMe, setAboutMe] = useState<string>(user?.aboutMe ?? "");
    const [profilePicture, setProfilePicture] = useState<CanvasPath[] | null>(null);

    const pfpRef = useRef<ReactSketchCanvasRef>(null);

    const [isDrawMode, setIsDrawMode] = useState(true);
    const [size, setSize] = useState(4);
    const [colour, setColour] = useState("#000000");
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        pfpRef?.current?.eraseMode(!isDrawMode);
    }, [isDrawMode])

    useEffect(() => {
        setDisplayName(user?.displayName ?? "")
        setAboutMe(user?.aboutMe ?? "")
    }, [user]);

    useEffect(() => {
        if (pfpRef && user && user?.profilePicture) {
            pfpRef?.current?.loadPaths(user?.profilePicture);
        }
    }, [user, pfpRef])

    const handleChangeColour = (colorResult: ColorResult) => {
        setColour(colorResult.hex);
    };

    const clearPfp = () => {
        pfpRef?.current?.clearCanvas();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "displayName")
            setDisplayName(value);
        if (name === "aboutMe")
            setAboutMe(value);
    };

    const handleChangePfp = async () => {
        const pfp = await pfpRef?.current?.exportPaths()
        setProfilePicture(pfp === undefined ? null : pfp)
    }

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
            const res = await fetch('/api/account/edit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    displayName: displayName,
                    aboutMe: aboutMe,
                    profilePicture: profilePicture ?? [],
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
                        <div className="d-flex justify-content-center">
                            <DrawCanvas
                                ref={pfpRef}
                                width={200}
                                height={200}
                                size={size}
                                colour={colour}
                                onChange={() => handleChangePfp()} />
                        </div>
                        <div className="d-flex justify-content-center gap-3 align-items-center mt-2">
                            <Button variant={isDrawMode ? "primary" : "default"} onClick={() => setIsDrawMode(true)}>
                                <Icon name="pen" />
                            </Button>
                            <Button variant={isDrawMode ? "default" : "primary"} onClick={() => setIsDrawMode(false)}>
                                <Icon name="eraser" />
                            </Button>
                            <Button variant="primary" onClick={() => clearPfp()}>
                                <Icon name="trash3" />
                            </Button>
                            <div style={{ position: "relative", display: "inline-block" }}>
                                <div
                                    onClick={() => setShowPicker(!showPicker)}
                                    style={{
                                        backgroundColor: colour,
                                        width: "36px",
                                        height: "36px",
                                        border: "1px solid #ccc",
                                        cursor: "pointer",
                                    }}
                                />
                                {showPicker && (
                                    <div style={{ position: "absolute", zIndex: 2 }}>
                                        <SketchPicker color={colour} onChange={handleChangeColour} />
                                    </div>
                                )}
                            </div>
                            <div className="d-flex gap-1">
                                <Icon name="brush" />
                                <Form.Range
                                    min={1}
                                    max={40}
                                    value={size}
                                    onChange={(e) => setSize(parseInt(e.target.value))}
                                />
                            </div>
                        </div>
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

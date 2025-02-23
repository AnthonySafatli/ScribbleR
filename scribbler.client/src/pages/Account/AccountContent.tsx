import { useState } from "react";
import { Button, Col, Form, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";

import Icon from "../../components/Icon";

import { AppUser } from "../../models/AppUser";

interface Props {
    accountInfo: AppUser | null | undefined
    setAccountInfo: (signInInfo: AppUser | null) => void
}

function AccountContent({ setAccountInfo, accountInfo }: Props) {

    const [displayName, setDisplayName] = useState<string | undefined>(accountInfo?.displayName === null ? "" : accountInfo?.displayName);
    const [loadingDisplayNameUpdate, setLoadingDisplayNameUpdate] = useState(false);
    const [successDisplayNameUpdate, setSuccessDisplayNameUpdate] = useState(false);

    const [aboutMe, setAboutMe] = useState<string | undefined>(accountInfo?.aboutMe === null ? "" : accountInfo?.aboutMe);
    const [loadingAboutMeUpdate, setLoadingAboutMeUpdate] = useState(false);
    const [successAboutMeUpdate, setSuccessAboutMeUpdate] = useState(false);

    console.log(displayName)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "displayName")
            setDisplayName(value);
        if (name === "aboutMe")
            setAboutMe(value);
    };

    const handleDisplayNameUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    const handleAboutMeUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <>
            <h1 className="mb-5 mt-3">Account Page</h1>

            <Form onSubmit={handleDisplayNameUpdate}>
                <Row>
                    <Col lg={3} className="py-2">
                        <Form.Label className="m-0">Display Name</Form.Label>
                    </Col>
                    <Col className="py-2">
                        <Form.Control
                            type="text"
                            name="displayName"
                            id="displayName"
                            onChange={handleChange}
                            placeholder="The name others will see"
                            value={displayName} />
                    </Col>
                    <Col lg={4} className="py-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <Button variant="outline-primary" type="submit" className="px-4">Save Changes</Button>
                            {!loadingDisplayNameUpdate && (accountInfo?.displayName != displayName) && (
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                        <Tooltip id="button-tooltip">
                                        You have unsaved changes!
                                        </Tooltip>
                                    }
                                >
                                    <div>
                                        <Icon name="exclamation-diamond-fill" colour="warning" />
                                        <span className="visually-hidden">You have unsaved changes!</span>
                                    </div>
                                </OverlayTrigger>
                            )}
                            {loadingDisplayNameUpdate && (
                                <Spinner animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )}
                            {successDisplayNameUpdate && (
                                <Icon name="check-circle-fill" colour="success"/>
                            )}
                        </div>
                    </Col>
                </Row>
            </Form>
            <Form onSubmit={handleAboutMeUpdate}>
                <Form.Group className="my-3">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="aboutMe"
                        id="aboutMe"
                        onChange={handleChange}
                        placeholder="Write a little bit about yourself (optional)"
                        value={aboutMe} />
                    <Col xs={4} className="py-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <Button variant="outline-primary" type="submit" className="px-4">Save Changes</Button>
                            {!loadingAboutMeUpdate && (accountInfo?.aboutMe != aboutMe) && (
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                        <Tooltip id="button-tooltip">
                                            You have unsaved changes!
                                        </Tooltip>
                                    }
                                >
                                    <div>
                                        <Icon name="exclamation-diamond-fill" colour="warning" />
                                        <span className="visually-hidden">You have unsaved changes!</span>
                                    </div>
                                </OverlayTrigger>
                            )}
                            {loadingAboutMeUpdate && (
                                <Spinner animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )}
                            {successAboutMeUpdate && (
                                <Icon name="check-circle-fill" colour="success" />
                            )}
                        </div>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
}

export default AccountContent;
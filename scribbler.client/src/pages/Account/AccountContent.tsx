import { useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";

import Icon from "../../components/Icon";

import { AppUser } from "../../models/AppUser";

interface Props {
    accountInfo: AppUser | null | undefined
    setAccountInfo: (signInInfo: AppUser | null) => void

    displayName: string | undefined
    aboutMe: string | undefined
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function AccountContent({ setAccountInfo, accountInfo, displayName, aboutMe, handleChange }: Props) {

    const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);
    const [successFormSubmit, setSuccessFormSubmit] = useState(false);

    const [alertError, setAlertError] = useState<string | null>("");

    const unsavedChanges = () => {
        if (accountInfo?.aboutMe != aboutMe)
            return true;
        if (accountInfo?.displayName != displayName)
            return true;

        return false;
    }
    const handleAccountSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!displayName) {
            setAlertError("Display Name cannot be empty!");
            return;
        }
    };

    return (
        <>
            <h1 className="mb-5 mt-3">Account Page</h1>

            {alertError && (
                <Alert variant="danger" onClose={() => setAlertError(null)} dismissible>
                    {alertError}
                </Alert>
            )}

            <Form onSubmit={handleAccountSave}>
                <Row>
                    <Col lg={3} className="py-2">
                        <Form.Label className="m-0">Display Name</Form.Label>
                        <span className="text-danger">&nbsp;*</span>
                    </Col>
                    <Col className="py-2">
                        <Form.Control
                            type="text"
                            name="displayName"
                            id="displayName"
                            onChange={handleChange}
                            value={displayName}
                            placeholder="Enter your preferred display name" />
                    </Col>
                </Row>
                <Form.Group className="my-3">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="aboutMe"
                        id="aboutMe"
                        onChange={handleChange}
                        value={aboutMe}
                        placeholder="Share something interesting about yourself!" />
                </Form.Group>
                <Form.Group>
                    <div className="d-flex justify-content-between align-items-center">
                        {unsavedChanges() && (
                            <Button variant="outline-primary" type="submit" className="px-4">Save Changes</Button>
                        )}
                        {loadingFormSubmit && (
                            <Spinner animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                        {successFormSubmit && (
                            <Icon name="check-circle-fill" colour="success" />
                        )}
                    </div>
                </Form.Group>
            </Form>
        </>
    );
}

export default AccountContent;
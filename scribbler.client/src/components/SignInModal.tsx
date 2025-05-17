import { useState } from "react";
import {  Modal } from "react-bootstrap";

import SignInForm from "./SignInForm";

interface Props {
    show: boolean,
    onClose: () => void,
    redirectLink?: string
}

function SignInModal({ show, onClose, redirectLink = '/'}: Props) {
    const [closeToggle, setCloseToggle] = useState(false);

    const closeModal = () => {
        onClose();
        setCloseToggle(!closeToggle);
    }

    const onSignedIn = () => {
        window.location.href = redirectLink;
    }

    return (
        <Modal show={show} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign In!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SignInForm closeToggle={closeToggle} onSignedIn={onSignedIn} />
            </Modal.Body>
        </Modal>
    );
}

export default SignInModal;
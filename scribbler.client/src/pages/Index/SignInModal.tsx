import { useState } from "react";
import {  Modal } from "react-bootstrap";

import SignInForm from "../../components/SignInForm";

interface Props {
    show: boolean,
    onClose: () => void
}

function SignInModal({ show, onClose }: Props) {
    const [closeToggle, setCloseToggle] = useState(false);

    const closeModal = () => {
        onClose();
        setCloseToggle(!closeToggle);
    }

    const onSignedIn = () => {
        window.location.href = '/';
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
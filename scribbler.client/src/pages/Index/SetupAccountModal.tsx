import { useState } from "react";
import {  Modal } from "react-bootstrap";

import SetupAccountForm from "../../components/SetupAccountForm";

interface Props {
    show: boolean,
    onClose: () => void
}

function SetupAccountModal({ show, onClose }: Props) {
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
                <SetupAccountForm closeToggle={closeToggle} onSignedIn={onSignedIn} />
            </Modal.Body>
        </Modal>
    );
}

export default SetupAccountModal;
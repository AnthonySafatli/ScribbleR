import { useState } from "react";
import {  Modal } from "react-bootstrap";

import SetupAccountForm from "../../components/SetupAccountForm";

interface Props {
    show: boolean,
}

function SetupAccountModal({ show }: Props) {
    const onFormSubmit = () => {
        window.location.href = '/';
    }

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>Setup Account!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SetupAccountForm onFormSubmit={onFormSubmit} />
            </Modal.Body>
        </Modal>
    );
}

export default SetupAccountModal;
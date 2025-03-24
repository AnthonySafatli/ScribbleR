import {  Modal } from "react-bootstrap";

import SetupAccountForm from "../../components/SetupAccountForm";

interface Props {
    show: boolean,
}

function SetupAccountModal({ show }: Props) {
    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>Setup Account!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SetupAccountForm />
            </Modal.Body>
        </Modal>
    );
}

export default SetupAccountModal;
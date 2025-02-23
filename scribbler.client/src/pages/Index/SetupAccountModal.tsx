import {  Modal } from "react-bootstrap";

import SetupAccountForm from "../../components/SetupAccountForm";

interface Props {
    show: boolean,
    userId: string | undefined
}

function SetupAccountModal({ show, userId }: Props) {
    const onFormSubmit = () => {
        window.location.href = '/';
    }

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>Setup Account!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SetupAccountForm onFormSubmit={onFormSubmit} userId={userId} />
            </Modal.Body>
        </Modal>
    );
}

export default SetupAccountModal;
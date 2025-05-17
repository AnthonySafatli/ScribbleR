import { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";

function DevelopmentWarning() {

    const [showFeaturesModal, setShowFeaturesModal] = useState(false);

    const features = [
        {
            title: 'UI Overhaul',
            description:
                'The current Bootstrap-based design will be replaced with a custom mix of Bootstrap and CSS for a more refined look.'
        },
        {
            title: 'Chat History',
            description:
                'Chat history will be automatically saved to the database and viewable from the account page.'
        },
        {
            title: 'Public GitHub Page',
            description:
                'The repository will be made public after the project is complete, with a detailed README. Sensitive information will be removed beforehand.'
        },
    ];

    return (
        <>
            <Modal show={showFeaturesModal} onHide={() => setShowFeaturesModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Planned Features</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {features.map((feature, idx) => (
                        <div key={idx}>
                            <h5>{feature.title}</h5>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>

            <Container>
                <p className="text-center m-1 mt-2 text-muted">
                    This site is still under development,
                    and is planned to be done by the end of May.
                    Click&nbsp;
                    <Button variant="link" className="p-0 align-baseline" onClick={() => setShowFeaturesModal(true)}>
                        here
                    </Button>
                    &nbsp;to see a list of planned features
                </p>
            </Container>
        </>
    )
};

export default DevelopmentWarning;
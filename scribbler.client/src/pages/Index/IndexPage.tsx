import { useState } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";
import { AuthContextData } from "../../models/AppUser";

import logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import { Button, Modal } from "react-bootstrap";

function IndexPage() {
    const { user } = useAuthContext() as AuthContextData;
    const [showSignInModal, setShowSignInModal] = useState(false);
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
        <div className="vh-100 d-flex flex-column">
            <IndexNav onSignIn={() => setShowSignInModal(true)} accountInfo={user} /> 

            <SignInModal show={showSignInModal} onClose={() => setShowSignInModal(false)} />

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

            <p className="text-center m-1 mt-2 text-muted">
                This site is still under development,
                and is planned to be done by the end of May.
                Click&nbsp;
                    <Button variant="link" className="p-0 align-baseline" onClick={() => setShowFeaturesModal(true)}>
                        here
                    </Button>
                &nbsp;to see a list of planned features
            </p>
            
            <CenteredContainer>
                <main>
                    <div className="d-flex flex-column flex-md-row align-items-center gap-4 text-center">
                        <p className="display-6 text-uppercase m-0">Welcome To</p>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
                        >
                            <img className="mb-3" src={logo} alt="logo" style={{ height: '100px' }} />
                        </motion.div>
                    </div>
                    <p className="text-center mb-1 mt-3 text-uppercase">{user === null && "Sign in and"} Join a Room</p>
                    <ChatRoomForm />
                </main>
            </CenteredContainer>
        </div>
    );
}

export default IndexPage;
import { useState } from "react";
import { motion } from "framer-motion";

import { useAuthContext } from "../../hooks/useAuthContext";
import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import NavBar from "../../components/NavBar";
import SignInModal from "../../components/SignInModal";
import { AuthContextData } from "../../models/AppUser";
import DevelopmentWarning from "./DevelopmentWarning";

import logo from "../../assets/logo.png";

function IndexPage() {

    const { user } = useAuthContext() as AuthContextData;

    const [showSignInModal, setShowSignInModal] = useState(false);

    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar onSignIn={() => setShowSignInModal(true)} accountInfo={user} /> 

            <SignInModal show={showSignInModal} onClose={() => setShowSignInModal(false)} />

            <DevelopmentWarning />
            
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
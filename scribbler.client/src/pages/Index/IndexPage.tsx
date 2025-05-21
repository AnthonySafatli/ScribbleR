import { useState } from "react";
import { motion } from "framer-motion";

import { useAuthContext } from "../../hooks/useAuthContext";
import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";
import { AuthContextData } from "../../models/AppUser";

import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";
import { useColourMode, ColourMode } from "../../context/ColourModeContext";

function IndexPage() {
    const { user } = useAuthContext() as AuthContextData;

    const [showSignInModal, setShowSignInModal] = useState(false);

    const { isDark } = useColourMode() as ColourMode;

    return (
        <div className="vh-100 d-flex flex-column">
            <IndexNav onSignIn={() => setShowSignInModal(true)} accountInfo={user} /> 

            <SignInModal show={showSignInModal} onClose={() => setShowSignInModal(false)} />
            
            <CenteredContainer>
                <main>
                    <div className="d-flex align-items-center gap-4">
                        <p className="display-6 text-center text-uppercase">Welcome To</p>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
                        >
                            <img className="mb-3" src={isDark ? logoLight : logoDark} alt="logo" style={{ height: '100px' }} />
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
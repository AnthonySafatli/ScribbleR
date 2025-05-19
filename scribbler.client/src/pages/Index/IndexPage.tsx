import { useState } from "react";
import { motion } from "framer-motion";

import { useAuthContext } from "../../hooks/useAuthContext";
import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";
import { AuthContextData } from "../../models/AppUser";
import GetInitialTheme from "../../utils/ThemeUtils";

import logoLight from "../../assets/logo-light.png";
import logo from "../../assets/logo.png";

function IndexPage() {
    const { user } = useAuthContext() as AuthContextData;

    const [showSignInModal, setShowSignInModal] = useState(false);
    const [isDark, setIsDark] = useState(GetInitialTheme());

    return (
        <div className="vh-100 d-flex flex-column">
            <IndexNav
                onSignIn={() => setShowSignInModal(true)}
                accountInfo={user}
                isDark={isDark}
                setIsDark={setIsDark} /> 

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
                            <img className="mb-3" src={isDark ? logoLight : logo} alt="logo" style={{ height: '100px' }} />
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
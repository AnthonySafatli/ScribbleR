import { useState } from "react";

import About from "./About";
import NavBar from "../../components/NavBar";
import SignInModal from "../../components/SignInModal";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";
import CenteredContainer from "../../components/CenteredContainer";

const AboutPage = () => {

    const { user } = useAuthContext() as AuthContextData;

    const [showSignInModal, setShowSignInModal] = useState(false);

    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar onSignIn={() => setShowSignInModal(true)} accountInfo={user} />

            <SignInModal show={showSignInModal} onClose={() => setShowSignInModal(false)} redirectLink="/About" />

            <CenteredContainer>
                <About />
            </CenteredContainer>

            <p className="text-center m-1 mt-5 text-muted">Version 1.3</p>
        </div>
    )
}

export default AboutPage;

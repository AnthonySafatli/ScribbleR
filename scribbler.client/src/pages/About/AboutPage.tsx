import { useState } from "react";

import MyHelmet from "../../components/MyHelmet";
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
        <>
            <MyHelmet
                title="About - ScribbleR"
                description="ScribbleR is a real-time drawing and messaging web app inspired by PictoChat. Learn about the project, the tech behind it, and its creator, Anthony Safatli."
                canonical="https://scribbler.anthonysafatli.ca/About"
            />
            <div className="vh-100 d-flex flex-column">
                <NavBar onSignIn={() => setShowSignInModal(true)} accountInfo={user} />

                <SignInModal show={showSignInModal} onClose={() => setShowSignInModal(false)} redirectLink="/About" />

                <CenteredContainer>
                    <About />
                </CenteredContainer>

                <p className="text-center m-1 mt-5 text-muted">Version 1.3</p>
            </div>
        </>
    )
}

export default AboutPage;

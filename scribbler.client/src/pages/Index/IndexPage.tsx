import { useEffect, useState } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";
import SetupAccountModal from "./SetupAccountModal";
import { AuthContextData } from "../../models/AppUser";

function IndexPage() {
    const { user } = useAuthContext() as AuthContextData;
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSetupAccountModal, setShowSetupAccountModal] = useState(false);

    useEffect(() => {
        if (user === null || user === undefined) {
            setShowSetupAccountModal(false)
            return;
        }
        setShowSetupAccountModal(!user.isSetup)
    }, [user])

    return (
        <div className="vh-100 d-flex flex-column">
            <IndexNav onSignIn={() => setShowSignInModal(true)} accountInfo={user} /> 

            <SignInModal show={showSignInModal} onClose={() => setShowSignInModal(false)} />
            <SetupAccountModal show={showSetupAccountModal} />
            
            <CenteredContainer>
                <main>
                    <ChatRoomForm />
                </main>
            </CenteredContainer>
        </div>
    );
}

export default IndexPage;
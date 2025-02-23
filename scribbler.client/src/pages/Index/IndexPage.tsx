import { useEffect, useState } from "react";

import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";
import SetupAccountModal from "./SetupAccountModal";

import { AppUser, PingAuth } from "../../models/AppUser";

interface Props {
    accountInfo: AppUser | null | undefined
    setSignInInfo: (signInInfo: AppUser | null) => void
}

function IndexPage({ setSignInInfo, accountInfo }: Props) {
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSetupAccountModal, setShowSetupAccountModal] = useState(false);

    useEffect(() => {
        async function getAccountInfo() {
            setSignInInfo(await PingAuth())
        }

        getAccountInfo();
    }, [])

    useEffect(() => {
        if (accountInfo === null || accountInfo === undefined) {
            setShowSetupAccountModal(false)
            return;
        }
        setShowSetupAccountModal(!accountInfo.isSetup)
    }, [accountInfo])

    return (
        <div className="vh-100 d-flex flex-column">
            <IndexNav onSignIn={() => setShowSignInModal(true)} signedIn={accountInfo != null} /> 

            <SignInModal show={showSignInModal} onClose={() => setShowSignInModal(false)} />
            <SetupAccountModal show={showSetupAccountModal} userId={accountInfo?.id} />
            
            <CenteredContainer>
                <main>
                    <ChatRoomForm />
                </main>
            </CenteredContainer>
        </div>
    );
}

export default IndexPage;
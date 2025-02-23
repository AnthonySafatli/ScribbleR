import { useEffect, useState } from "react";

import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";

import { AppUser, PingAuth } from "../../models/AppUser";

interface Props {
    accountInfo: AppUser | null | undefined
    setSignInInfo: (signInInfo: AppUser | null) => void
}

function IndexPage({ setSignInInfo, accountInfo }: Props) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function getAccountInfo() {
            setSignInInfo(await PingAuth())
        }

        getAccountInfo();
    }, [])

    return (
        <div className="vh-100 d-flex flex-column">
            <IndexNav onSignIn={() => setShowModal(true)} signedIn={accountInfo != null} /> 

            <SignInModal show={showModal} onClose={() => setShowModal(false)} />

            <CenteredContainer>
                <main>
                    <ChatRoomForm />
                </main>
            </CenteredContainer>
        </div>
    );
}

export default IndexPage;
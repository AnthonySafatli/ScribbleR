import { useEffect, useState } from "react";

import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";

import AppUser from "../../models/AppUser";

interface Props {
    setSignInInfo: (signInInfo: AppUser | null) => void
    accountInfo: AppUser | null
}

function IndexPage({ setSignInInfo, accountInfo }: Props) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch("/pingauth", {
            method: "GET",
        }).then((res) => {
            if (res.status == 200)
                return res.json();
        }).then((data) => {
            if (data) {
                setSignInInfo(data as AppUser);
            }
        }).catch(e => {
            console.error(e);
        })
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
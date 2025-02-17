import { useEffect, useState } from "react";

import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";

function IndexPage() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        fetch("/pingauth", {
            method: "GET",
        }).then((res) => {
            if (res.status == 200)
                return res.json();
        }).then((data) => {
            if (data) {
                console.log(data)
                setEmail(data.email);
            }
        }).catch(e => {
            console.error(e);
        })
    }, [])

    return (
        <div className="vh-100 d-flex flex-column">
            <IndexNav onSignIn={() => setShowModal(true)} email={email} /> 

            <SignInModal show={showModal} onClose={() => setShowModal(false)} />
            
            <CenteredContainer>
                <ChatRoomForm />
            </CenteredContainer>
        </div>
    );
}

export default IndexPage;
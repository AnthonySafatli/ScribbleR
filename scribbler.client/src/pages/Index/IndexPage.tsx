import { useState } from "react";

import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";

function IndexPage() {
    const [show, setShow] = useState(false);

    return (
        <div className="vh-100 d-flex flex-column">
            <IndexNav onSignIn={() => setShow(true)} /> 

            <SignInModal show={show} onClose={() => setShow(false)} />
            
            <CenteredContainer>
                <ChatRoomForm />
            </CenteredContainer>
        </div>
    );
}

export default IndexPage;
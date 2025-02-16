import { useState } from "react";

import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";
import SignInModal from "./SignInModal";

function IndexPage() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="vh-100 d-flex flex-column">
            <IndexNav onSignIn={handleShow} /> 

            <SignInModal show={show} onClose={handleClose} />
            
            <CenteredContainer>
                <ChatRoomForm />
            </CenteredContainer>
        </div>
    );
}

export default IndexPage;
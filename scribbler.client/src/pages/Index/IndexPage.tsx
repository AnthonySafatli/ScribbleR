import CenteredContainer from "../../components/CenteredContainer";
import ChatRoomForm from "./ChatRoomForm";
import IndexNav from "./IndexNav";

function IndexPage() {
    return (
        <div className="vh-100 d-flex flex-column">
            <IndexNav /> 
            
            <CenteredContainer>
                <ChatRoomForm />
            </CenteredContainer>
        </div>
    );
}

export default IndexPage;
import CenteredContainer from "../components/CenteredContainer";

function NotFound() {
    return (
        <div className="vh-100 d-flex flex-column">
            <CenteredContainer>
                Error 404: Page Not Found
            </CenteredContainer>
        </div>
    );
}

export default NotFound;
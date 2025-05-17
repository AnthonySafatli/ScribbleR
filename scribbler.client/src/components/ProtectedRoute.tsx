import { Outlet } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContextData } from "../models/AppUser";
import SignInForm from "./SignInForm";
import CenteredContainer from "./CenteredContainer";

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuthContext() as AuthContextData;

    if (loading) {
        return (
            <div className="vh-100 d-flex flex-column">
                <CenteredContainer>
                    Loading...
                </CenteredContainer>
            </div>
        );
    }

    if (user === null) {
        return (
            <div className="vh-100 d-flex flex-column">
                <CenteredContainer>
                    <div>
                        <h1>Sign In!</h1>
                        <SignInForm closeToggle={false} onSignedIn={() => { location.reload() }} />
                    </div>
                </CenteredContainer>
            </div>
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;

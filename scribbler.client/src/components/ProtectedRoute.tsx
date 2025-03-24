import { Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import SignInForm from "./SignInForm";
import CenteredContainer from "./CenteredContainer";
import SetupAccountForm from "./SetupAccountForm";

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading)
        return
            <div className="vh-100 d-flex flex-column">
                <CenteredContainer>
                    Loading...
                </CenteredContainer>
            </div>;

    console.log(user)

    return user ?
        user.isSetup ?
            <Outlet />
            :
            <div className="vh-100 d-flex flex-column">
                <CenteredContainer>
                    <div>
                        <h1>Setup Account!</h1>
                        <SetupAccountForm />
                    </div>
                </CenteredContainer>
            </div>
        :
        <div className="vh-100 d-flex flex-column">
            <CenteredContainer>
                <div>
                    <h1>Sign In!</h1>
                    <SignInForm closeToggle={false} onSignedIn={() => { location.reload() }} />
                </div>
            </CenteredContainer>
        </div>
};

export default ProtectedRoute;
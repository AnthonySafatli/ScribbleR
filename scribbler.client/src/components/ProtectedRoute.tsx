import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import SignInForm from "./SignInForm";
import CenteredContainer from "./CenteredContainer";
import SetupAccountForm from "./SetupAccountForm";

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuth();
    const [isSetup, setIsSetup] = useState<boolean | null>(null);  

    useEffect(() => {
        if (user) {
            setIsSetup(user?.isSetup ?? null); // TODO: Does not work
        }
    }, [user]);

    if (loading) {
        return (
            <div className="vh-100 d-flex flex-column">
                <CenteredContainer>
                    Loading...
                </CenteredContainer>
            </div>
        );
    }

    if (user === null || isSetup === null) {
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

    if (user && isSetup) {
        return <Outlet />;
    }

    return (
        <div className="vh-100 d-flex flex-column">
            <CenteredContainer>
                <div>
                    <h1>Setup Account!</h1>
                    <SetupAccountForm />
                </div>
            </CenteredContainer>
        </div>
    );
};

export default ProtectedRoute;

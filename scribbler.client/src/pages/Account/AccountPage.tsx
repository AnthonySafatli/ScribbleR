import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SignInForm from '../../components/SignInForm';
import SetupAccountForm from '../../components/SetupAccountForm';
import AccountNav from './AccountNav';
import AccountContent from './AccountContent';
import FriendsContent from './FriendsContent';
import HistoryContent from './HistoryContent';

import { AppUser, PingAuth } from '../../models/AppUser';

interface Props {
    accountInfo: AppUser | null | undefined
    setAccountInfo: (signInInfo: AppUser | null) => void
}

function AccountPage({ setAccountInfo, accountInfo }: Props) {

    const [displayName, setDisplayName] = useState<string>("");
    const [aboutMe, setAboutMe] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "displayName")
            setDisplayName(value);
        if (name === "aboutMe")
            setAboutMe(value);
    };

    useEffect(() => {
        async function getAccountInfo() {
            const fetchedAccountInfo = await PingAuth();
            setAccountInfo(fetchedAccountInfo);
        }
        getAccountInfo();
    }, []); 

    useEffect(() => {
        if (accountInfo) {
            setDisplayName(accountInfo.displayName ?? "");
            setAboutMe(accountInfo.aboutMe ?? "");
        }
    }, [accountInfo]); 


    const [currentPage, setCurrentPage] = useState(1);

    const renderContent = () => {

        const accountContent = <AccountContent
                                    setAccountInfo={setAccountInfo}
                                    accountInfo={accountInfo}
                                    displayName={displayName}
                                    aboutMe={aboutMe}
                                    handleChange={handleChange} />

        switch (currentPage) {
            case 1:
                return accountContent;
            case 2:
                return <FriendsContent />;
            case 3:
                return <HistoryContent />;
            default:
                return accountContent;
        }
    };

    const onFormSubmit = () => {
        window.location.href = "/Account";
    }

    return (
        <Container>
            {
                accountInfo === undefined ?
                    <></> :
                    accountInfo === null ?
                        <Row className="mt-5">
                            <Col lg={6}>
                                <h1 className="mb-3">Sign In!</h1>
                                <SignInForm closeToggle={false} onSignedIn={onFormSubmit} /> 
                            </Col>
                        </Row> 
                        :
                        accountInfo.isSetup ? 
                            <Row className="vh-100 py-5">
                                <AccountNav currentPage={currentPage} navigate={setCurrentPage} />

                                <Col>
                                    <div className="px-5">
                                        { renderContent() }
                                    </div>
                                </Col>
                            </Row>
                            :
                            <Row className="mt-5">
                                <Col lg={6}>
                                    <h1 className="mb-3">Setup Account!</h1>
                                    <SetupAccountForm onFormSubmit={onFormSubmit} userId={accountInfo.id} />
                                </Col>
                            </Row> 
            }
        </Container>
    );
}

export default AccountPage;
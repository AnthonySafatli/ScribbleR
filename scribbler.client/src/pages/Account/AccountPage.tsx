import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import AccountNav from './AccountNav';
import AccountContent from './AccountContent';
import FriendsContent from './FriendsContent';
import HistoryContent from './HistoryContent';

import { AppUser, PingAuth } from '../../models/AppUser';
import SignInForm from '../../components/SignInForm';
import CenteredContainer from '../../components/CenteredContainer';

interface Props {
    accountInfo: AppUser | null | undefined
    setAccountInfo: (signInInfo: AppUser | null) => void
}

function AccountPage({ setAccountInfo, accountInfo }: Props) {

    useEffect(() => {
        async function getAccountInfo() {
            setAccountInfo(await PingAuth())
        }

        getAccountInfo();
    }, [])

    const [currentPage, setCurrentPage] = useState(1);

    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return <AccountContent setAccountInfo={setAccountInfo} accountInfo={accountInfo} />;
            case 2:
                return <FriendsContent />;
            case 3:
                return <HistoryContent />;
            default:
                return <AccountContent setAccountInfo={setAccountInfo} accountInfo={accountInfo} />;
        }
    };

    const onSignedIn = () => {
        window.location.href = "/Account";
    }

    return (
        <Container>
            {
                accountInfo === undefined ?
                    <></> :
                    accountInfo === null ?
                        <Container className="mt-5">
                            <h1 className="mb-3">Sign In!</h1>
                            <SignInForm closeToggle={false} onSignedIn={onSignedIn} /> 
                        </Container> 
                        :
                        <Row className="vh-100 py-5">
                            <AccountNav currentPage={currentPage} navigate={setCurrentPage} />

                            <Col>
                                { renderContent() }
                            </Col>
                        </Row>
            }
        </Container>
    );
}

export default AccountPage;
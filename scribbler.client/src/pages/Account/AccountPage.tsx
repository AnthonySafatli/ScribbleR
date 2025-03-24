import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import AccountNav from './AccountNav';
import AccountContent from './AccountContent';
import FriendsContent from './FriendsContent';
import HistoryContent from './HistoryContent';
import { AuthContextData } from '../../models/AppUser';
import { useAuthContext } from '../../hooks/useAuthContext';

function AccountPage() {

    

    const [currentPage, setCurrentPage] = useState(1);

    const renderContent = () => {

        const accountContent = <AccountContent
                                    setAccountInfo={setUser}
                                    accountInfo={user}
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

    return (
        <Container>
            <Row className="vh-100 py-5">
                <AccountNav currentPage={currentPage} navigate={setCurrentPage} />

                <Col>
                    <div className="px-5">
                        { renderContent() }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountPage;
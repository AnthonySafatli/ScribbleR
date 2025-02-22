import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import AccountNav from './AccountNav';
import AccountContent from './AccountContent';
import FriendsContent from './FriendsContent';
import HistoryContent from './HistoryContent';

function AccountPage() {

    const [currentPage, setCurrentPage] = useState(1);

    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return <AccountContent />;
            case 2:
                return <FriendsContent />;
            case 3:
                return <HistoryContent />;
            default:
                return <AccountContent />;
        }
    };

    return (
        <Container>
            <Row className="vh-100 py-5 px-4">
                <AccountNav currentPage={currentPage} navigate={setCurrentPage} />

                <Col>
                    { renderContent() }
                </Col>
            </Row>
        </Container>
    );
}

export default AccountPage;
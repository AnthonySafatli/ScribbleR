import { Container, Row, Col } from 'react-bootstrap';

import AccountNav from './AccountNav';

function AccountPage() {
    return (
        <Container>
            <Row className="vh-100 py-5 px-4">
                <AccountNav />

                <Col>
                    <main>
                        <h2>Welcome</h2>
                        <p>This is the content area where you can add your main content.</p>
                    </main>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountPage;
import { Container, Button, Row, Col } from 'react-bootstrap';

import './AccountPage.css';

function AccountPage() {
    return (
        <Container>
            <Row className="vh-100 py-5 px-4">
                <Col xs={3} className="d-none d-md-block">
                    <nav>
                        <div className="d-flex justify-content-center mb-5">
                            <div className="image-container"></div>
                        </div>
                        <ul className="nav flex-column gap-4">
                            <li className="nav-item">
                                <Button variant="primary" className="w-100 py-2">
                                    <i className="bi bi-person-circle mr-2"></i>
                                    <span>&nbsp;&nbsp; Account</span>
                                </Button>
                            </li>
                            <li className="nav-item">
                                <Button variant="" className="w-100 py-2">
                                    <i className="bi bi-people-fill"></i>
                                    <span>&nbsp;&nbsp; Friends</span>
                                </Button>
                            </li>
                            <li className="nav-item">
                                <Button variant="" className="w-100 py-2">
                                    <i className="bi bi-clock-history mr-2"></i>
                                    <span>&nbsp;&nbsp; History</span>
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </Col>

                <Col xs={2} className="d-block d-md-none">
                    <nav>
                        <div className="d-flex justify-content-center mb-5">
                            <div className="image-container"></div>
                        </div>
                        <ul className="nav flex-column align-items-center gap-4">
                            <li className="nav-item">
                                <Button variant="primary" className="py-2">
                                    <i className="bi bi-person-circle"></i>
                                </Button>
                            </li>
                            <li className="nav-item">
                                <Button variant="" className="py-2">
                                    <i className="bi bi-people-fill"></i>
                                </Button>
                            </li>
                            <li className="nav-item">
                                <Button variant="" className="py-2">
                                    <i className="bi bi-clock-history"></i>
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </Col>

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
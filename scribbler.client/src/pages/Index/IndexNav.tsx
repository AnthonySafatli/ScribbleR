import { Container, Nav, Navbar } from "react-bootstrap";

import Icon from "../../components/Icon";

interface Props {
    onSignIn: () => void;
    email: string | null;
}

function IndexNav({ onSignIn, email }: Props) {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand>ScribbleR</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {
                            email ?
                                <Nav.Link href="/Account">
                                    <Icon name="person-circle" />
                                    &nbsp; View Account
                                </Nav.Link> : 
                                <Nav.Link onClick={onSignIn}>Sign In</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}

export default IndexNav;
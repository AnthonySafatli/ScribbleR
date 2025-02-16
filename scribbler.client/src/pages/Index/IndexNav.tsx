import { Container, Nav, Navbar } from "react-bootstrap";

import SignInButton from "./SignInButton";

interface Props {
    onSignIn: () => void;
}

function IndexNav({ onSignIn }: Props) {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand>ScribbleR</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <SignInButton onSignIn={onSignIn} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}

export default IndexNav;
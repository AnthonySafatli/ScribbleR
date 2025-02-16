import { Container, Nav, Navbar } from "react-bootstrap";

function IndexNav() {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand>ScribbleR</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="https://www.example.com/">
                            Sign In
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}

export default IndexNav;
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";

import { AppUser } from "../models/AppUser";
import Icon from "./Icon";

import logo from "../assets/logo.png";

interface Props {
    onSignIn: () => void;
    accountInfo: AppUser | null | undefined;
}

function NavBar({ onSignIn, accountInfo }: Props) {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        alt="logo"
                        style={{ height: '50px' }} />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="gap-3">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/About">About</Nav.Link>
                        {
                            accountInfo === undefined ? (
                                <Spinner size='sm' />
                            ) : accountInfo === null ? (
                                <Nav.Link onClick={onSignIn}>Sign In</Nav.Link>
                            ) : (
                                <Nav.Link href="/Account">
                                    <Icon name="person-circle" />
                                    &nbsp; View Account
                                </Nav.Link>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

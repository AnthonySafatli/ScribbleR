import { Container, Nav, Navbar, Spinner } from "react-bootstrap";

import { AppUser } from "../../models/AppUser";
import Icon from "../../components/Icon";

interface Props {
    onSignIn: () => void;
    accountInfo: AppUser | null | undefined;
}

function IndexNav({ onSignIn, accountInfo }: Props) {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand>ScribbleR</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {
                            accountInfo === undefined ?
                                <Spinner size='sm'></Spinner>
                                :
                                accountInfo === null ?
                                    <Nav.Link onClick={onSignIn}>Sign In</Nav.Link>
                                    : 
                                    <Nav.Link href="/Account">
                                        <Icon name="person-circle" />
                                        &nbsp; View Account
                                    </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}

export default IndexNav;
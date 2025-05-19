import { Container, Nav, Navbar, Spinner } from "react-bootstrap";

import { AppUser } from "../../models/AppUser";
import Icon from "../../components/Icon";
import DarkModeToggle from "../../components/DarkModeToggle";

import logo from "../../assets/logo.png";
import logoLight from "../../assets/logo-light.png";

interface Props {
    onSignIn: () => void;
    accountInfo: AppUser | null | undefined;
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

function IndexNav({ onSignIn, accountInfo, isDark, setIsDark }: Props) {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>
                    <img
                        src={isDark ? logoLight : logo}
                        alt="logo"
                        style={{ height: '50px' }} />
                </Navbar.Brand>
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
                        <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}

export default IndexNav;
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";

import { AppUser } from "../../models/AppUser";
import Icon from "../../components/Icon";
import DarkModeToggle from "../../components/DarkModeToggle";
import { useColourMode, ColourMode } from "../../context/ColourModeContext";

import logo from "../../assets/logo.png";
import logoLight from "../../assets/logo-light.png";

interface Props {
    onSignIn: () => void;
    accountInfo: AppUser | null | undefined;
}

function IndexNav({ onSignIn, accountInfo }: Props) {

    const { isDark } = useColourMode() as ColourMode;

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
                        <DarkModeToggle />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}

export default IndexNav;
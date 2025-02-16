import { Nav } from "react-bootstrap";

interface Props {
    onSignIn: () => void;
}

function SignInButton({ onSignIn }: Props) {
    return (
        <Nav.Link onClick={onSignIn}>
            Sign In
        </Nav.Link>
    );
}

export default SignInButton;
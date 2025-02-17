import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";

interface Props {
    setEmail: (email: string) => void, 
    handleResult: (regsiter: boolean, login: boolean) => void,
}

function EmailInput({ setEmail, handleResult }: Props) {

    const [query, setQuery] = useState("");
    const [loadingEmailConfirm, setLoadingEmailConfirm] = useState(false);

    const pingEmail = (emailQuery: string) => {
        // set handle result to null
        // set loading
        // ping server
        // get result
        // set handle result to result
        // turn off loading
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => pingEmail(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    return (
        <div className="d-flex justify-content-center align-items-center gap-4">
            <Form.Control
                type="email"
                name="email"
                id="email"
                placeholder="name@email.com"
                onChange={e => setQuery(e.target.value)}
                autoFocus />
            {loadingEmailConfirm && (
                <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </div>
    );
}

export default EmailInput;
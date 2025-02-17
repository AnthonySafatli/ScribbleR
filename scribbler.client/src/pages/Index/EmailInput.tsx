import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";

interface Props {
    setEmail: (email: string) => void, 
    handleResult: (regsiter: boolean | null) => void,
    setError: (error: string) => void
}

function EmailInput({ setEmail, handleResult, setError }: Props) {

    const [query, setQuery] = useState("");
    const [loadingEmailConfirm, setLoadingEmailConfirm] = useState(false);

    const pingEmail = (emailQuery: string) => {
        if (!emailQuery) {
            setError("");
            handleResult(null);
            setLoadingEmailConfirm(false);
            return;
        }

        // setup
        setError("");
        handleResult(null);
        setLoadingEmailConfirm(true);

        // api query
        const url = `/needsregister?email=${encodeURIComponent(emailQuery)}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                handleResult(data.needsRegister);
                setEmail(emailQuery);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setError(error.message);
                handleResult(null);
            })
            .finally(() => {
                setLoadingEmailConfirm(false);
            });
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => pingEmail(query), 1000);
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
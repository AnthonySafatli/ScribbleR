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

    const pingEmail = async (emailQuery: string) => {
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
        const url = `/api/auth/needsregister?email=${encodeURIComponent(emailQuery)}`;
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Invalid Email!");
            }

            const data = await res.json();
            handleResult(data.needsRegister);
            setEmail(emailQuery);
        } catch (error: unknown) {
            console.error("Fetch error:", error);

            if (error instanceof Error) {
                setError(error.message); 
            } else {
                setError("An unknown error occurred"); 
            }

            handleResult(null);
        }
        
        setLoadingEmailConfirm(false);
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => pingEmail(query), 1500);
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
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

import Icon from "./Icon";

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

function PasswordInput({ handleChange, name = "password" }: Props) {

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    return (
        <div className="d-flex justify-content-center align-items-center gap-4">
            <Form.Control
                type={passwordVisibility ? "text" : "password"}
                name={name}
                onChange={handleChange}
                placeholder="Enter Password" />
            <Button variant="default" onClick={() => setPasswordVisibility(!passwordVisibility)}><Icon name={passwordVisibility ? "eye-slash" : "eye"} /></Button>
        </div>
    );
}

export default PasswordInput;
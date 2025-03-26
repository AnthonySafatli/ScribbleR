import { useState } from "react";
import { Button, Form } from "react-bootstrap";

import Icon from "./Icon";

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function PasswordInput({ handleChange }: Props) {

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    return (
        <div className="d-flex justify-content-center align-items-center gap-4">
            <Form.Control
                type={passwordVisibility ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleChange}
                placeholder="Enter Password" />
            <Button variant="default" onClick={() => setPasswordVisibility(!passwordVisibility)}><Icon name={passwordVisibility ? "eye-slash" : "eye"} /></Button>
        </div>
    );
}

export default PasswordInput;
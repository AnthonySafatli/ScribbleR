import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Cookie from "js-cookie";

import Icon from "./Icon";

interface Props {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

function DarkModeToggle({ isDark, setIsDark}: Props) {

    useEffect(() => {
        const theme = isDark ? "dark" : "light";
        document.body.setAttribute("data-bs-theme", theme);
        Cookie.set("theme", theme, { expires: 365 });
    }, [isDark]);

    return (
        <Button variant="default" onClick={() => setIsDark(prev => !prev)}>
            <Icon name={isDark ? "sun" : "moon"} />
        </Button>
    );
}

export default DarkModeToggle;

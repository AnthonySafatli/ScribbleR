import React, { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import GetInitialTheme from "./../utils/ThemeUtils";

const ColourModeContext = createContext<ColourMode | undefined>(undefined);

interface Props {
    children: React.ReactNode;
}

export const ColourModeProvider = ({ children }: Props) => {
    const [isDark, setIsDark] = useState(GetInitialTheme());

    useEffect(() => {
        const theme = isDark ? "dark" : "light";
        document.body.setAttribute("data-bs-theme", theme);
        Cookie.set("theme", theme, { expires: 365 });
    }, [isDark]);

    return (
        <ColourModeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ColourModeContext.Provider>
    );
};

export const useColourMode = () => useContext(ColourModeContext);

export interface ColourMode {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}
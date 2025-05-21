import Cookie from "js-cookie";

const GetInitialTheme = () => {
    const theme = Cookie.get("theme");
    if (theme === "dark" || theme === "light") return theme === "dark";
    return true;
};

export default GetInitialTheme;

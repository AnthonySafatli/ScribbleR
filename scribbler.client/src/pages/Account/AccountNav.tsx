import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";

import Icon from "../../components/Icon";

interface Props {
    currentPage: number,
    navigate: (newCurrentPage: number) => void
}

function AccountNav({ currentPage, navigate }: Props) {

    const mdThreshold = 768;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMd, setIsMd] = useState(window.innerWidth > mdThreshold);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setIsMd(window.innerWidth > mdThreshold);
    }, [windowWidth])

    function handleLogout() {
        fetch("/api/auth/logout", {
            method: "POST"
        }).then(res => {
            if (res.ok) {
                window.location.href = "/"
            }

            throw new Error("Error signing out")
        }).catch(e => {
            console.error(e)
        })
    }

    const imageStyle = {
        backgroundColor: 'grey',
        height: '75px',
        width: '75px', 
    };

    return (
        <Col xs={isMd ? 3 : 2}>
            <nav>
                <div className="d-flex justify-content-center mb-5">
                    <div style={imageStyle}></div>
                </div>
                <ul className={"nav flex-column gap-4 " + (isMd ? "" : "align-items-center")}>
                    <li className="nav-item">
                        <Button
                            variant={currentPage == 1 ? "primary" : ""}
                            className={"py-2" + (isMd ? " w-100" : "")}
                            onClick={() => { navigate(1) }}>
                            <Icon name="person-circle" />
                            {isMd && <span>&nbsp;&nbsp; Account</span>}
                        </Button>
                    </li>
                    <li className="nav-item">
                        <Button
                            variant={currentPage == 2 ? "primary" : ""}
                            className={"py-2" + (isMd ? " w-100" : "")}
                            onClick={() => { navigate(2) }}>
                            <Icon name="people-fill" />
                            {isMd && <span>&nbsp;&nbsp; Friends</span>}
                        </Button>
                    </li>
                    <li className="nav-item">
                        <Button
                            variant={currentPage == 3 ? "primary" : ""}
                            className={"py-2" + (isMd ? " w-100" : "")}
                            onClick={() => { navigate(3) }}>
                            <Icon name="clock-history" />
                            {isMd && <span>&nbsp;&nbsp; History</span>}
                        </Button>
                    </li>
                    <li className="nav-item mt-5">
                        <a className={"btn py-2" + (isMd ? " w-100" : "")} href="/">
                            <Icon name="arrow-left" />
                            {isMd && <span>&nbsp;&nbsp; Back to Home</span>}
                        </a>
                    </li>
                    <li className="nav-item">
                        <Button
                            variant=""
                            className={"py-2" + (isMd ? " w-100" : "")}
                            onClick={() => { handleLogout() }}>
                            <Icon name="box-arrow-right"></Icon>
                            {isMd && <span>&nbsp;&nbsp; Sign Out</span>}
                        </Button>
                    </li>
                </ul>
            </nav>
        </Col>
    );
}

export default AccountNav;
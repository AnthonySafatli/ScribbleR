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
                            <Icon name="person-circle"></Icon>
                            {isMd && <span>&nbsp;&nbsp; Account</span>}
                        </Button>
                    </li>
                    <li className="nav-item">
                        <Button
                            variant={currentPage == 2 ? "primary" : ""}
                            className={"py-2" + (isMd ? " w-100" : "")}
                            onClick={() => { navigate(2) }}>
                            <Icon name="people-fill"></Icon>
                            {isMd && <span>&nbsp;&nbsp; Friends</span>}
                        </Button>
                    </li>
                    <li className="nav-item">
                        <Button
                            variant={currentPage == 3 ? "primary" : ""}
                            className={"py-2" + (isMd ? " w-100" : "")}
                            onClick={() => { navigate(3) }}>
                            <Icon name="clock-history"></Icon>
                            {isMd && <span>&nbsp;&nbsp; History</span>}
                        </Button>
                    </li>
                </ul>
            </nav>
        </Col>
    );
}

export default AccountNav;
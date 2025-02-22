import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";

import Icon from "../../components/Icon";

function AccountNav() {
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

    return (
        <Col xs={isMd ? 3 : 2}>
            <nav>
                <div className="d-flex justify-content-center mb-5">
                    <div className="image-container"></div>
                </div>
                <ul className={"nav flex-column gap-4 " + (isMd ? "" : "align-items-center")}>
                    <li className="nav-item">
                        <Button variant="primary" className={"py-2" + (isMd ? " w-100" : "")}>
                            <Icon name="person-circle"></Icon>
                            {isMd && <span>&nbsp;&nbsp; Account</span>}
                        </Button>
                    </li>
                    <li className="nav-item">
                        <Button variant="" className={"py-2" + (isMd ? " w-100" : "")}>
                            <Icon name="people-fill"></Icon>
                            {isMd && <span>&nbsp;&nbsp; Friends</span>}
                        </Button>
                    </li>
                    <li className="nav-item">
                        <Button variant="" className={"py-2" + (isMd ? " w-100" : "")}>
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
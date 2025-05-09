import { useEffect, useState, useRef } from "react";
import { Button, Col } from "react-bootstrap";
import { ReactSketchCanvasRef } from "react-sketch-canvas";

import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContextData } from "../../models/AppUser";
import Icon from "../../components/Icon";
import DrawCanvas from "../../components/DrawCanvas";

interface Props {
    currentPage: number,
    navigate: (newCurrentPage: number) => void
}

function AccountNav({ currentPage, navigate }: Props) {

    const { user } = useAuthContext() as AuthContextData;

    const mdThreshold = 768;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMd, setIsMd] = useState(window.innerWidth > mdThreshold);

    const pfpRef = useRef<ReactSketchCanvasRef>(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setIsMd(window.innerWidth > mdThreshold);
    }, [windowWidth])

    useEffect(() => {
        if (pfpRef && user && user?.profilePicture) {
            pfpRef?.current?.loadPaths(user?.profilePicture);
        }
    }, [user, pfpRef])

    async function handleLogout() {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST"
            });

            if (res.ok) {
                window.location.href = "/";
            } else {
                throw new Error("Error signing out")
            }
        } catch (error: unknown) {
            console.error(error);
        }
    }

    return (
        <Col xs={isMd ? 3 : 2}>
            <nav>
                <div className="d-flex justify-content-center mb-5">
                    <DrawCanvas
                        ref={pfpRef}
                        paths={user?.profilePicture ?? []}
                        isDrawable={false}
                        height={75}
                        width={75} />
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
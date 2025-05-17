import { useEffect, useRef, useState } from "react";
import { Placeholder, Row, Spinner } from "react-bootstrap";
import { ReactSketchCanvasRef } from "react-sketch-canvas";

import { AppUser } from "../models/AppUser";
import DrawCanvas from "./DrawCanvas";
import { UnnormalizePaths } from "../utils/ScalePaths";

interface Props {
    userId: string;
}

function UserInfo({ userId }: Props) {

    const [user, setUser] = useState<AppUser | null>(null);

    const pfpRef = useRef<ReactSketchCanvasRef>(null);

    // TODO: The placeholders look like garbage

    useEffect(() => {
        async function getUser() {
            try {
                const res = await fetch("/api/Account/" + userId);
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                setUser(data);
            } catch (err: any) {
                console.error(err);
            }
        }

        getUser();

    }, [userId]);

    useEffect(() => {
        if (user?.profilePicture) {
            pfpRef?.current?.loadPaths(UnnormalizePaths(user.profilePicture, 75, 75));
        }
    }, [user])

    return (
        <div>
            <div className="d-flex align-items-center gap-2 mb-2">
                {user ? (
                    <DrawCanvas ref={pfpRef} height={75} width={75} isDrawable={false} />
                ): (
                    <div className="border border-dark d-flex justify-content-center align-items-center" style={{ width: 75, height: 75 }}>
                        <Spinner animation="border" />
                    </div>
                )}
                <div className="my-1">
                    {user ? (
                        <>
                            {user.displayName && <p className="lead m-0 p-0">{user.displayName}</p>}
                            <p className="font-monospace m-0 p-0">@{user.userHandle}</p>
                            <p className="m-0 p-0">{user.email}</p>
                        </>
                    ) : (
                        <Row>
                            <Placeholder as="p" animation="glow" className="lead m-0 p-0">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as="p" animation="glow" className="font-monospace m-0 p-0">
                                <Placeholder xs={4} />
                            </Placeholder>
                            <Placeholder as="p" animation="glow" className="m-0 p-0">
                                <Placeholder xs={5} />
                            </Placeholder>
                        </Row>
                    )}
                </div>
            </div>
            {user ? (
                <p className="mb-0">{user.aboutMe}</p>
            ) : (
                <Placeholder as="p" animation="glow" className="mb-0">
                    <Placeholder xs={10} /> <Placeholder xs={8} /> <Placeholder xs={6} />
                    <Placeholder xs={7} /> <Placeholder xs={5} />
                </Placeholder>
            )}
        </div>
    );
}

export default UserInfo;

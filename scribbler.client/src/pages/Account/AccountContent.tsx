import { Button } from "react-bootstrap";

import { AppUser } from "../../models/AppUser";

interface Props {
    accountInfo: AppUser | null | undefined
    setAccountInfo: (signInInfo: AppUser | null) => void
}

function AccountContent({ setAccountInfo, accountInfo }: Props) {

    function handleLogout() {
        fetch("/logout", {
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

    return (
        <>
            <h1>Account Page!</h1>

            {
                accountInfo &&
                <p>Email: {accountInfo.email}</p>
            }

            <Button onClick={handleLogout}>Logout</Button>
        </>
    );
}

export default AccountContent;
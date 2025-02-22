import { Button } from "react-bootstrap";

function AccountContent() {

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
            <Button onClick={handleLogout}>Logout</Button>
        </>
    );
}

export default AccountContent;
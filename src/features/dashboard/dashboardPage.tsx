import { useMsal } from "@azure/msal-react";

export default function DashboardPage({ onLogout }) {

    const { instance } = useMsal();
    const handleLogOut = () => {
        try {
            instance.logoutPopup()
            if (onLogout) {
                onLogout()
            }
        } catch (e) {
            console.log("Logout Failed", e)
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogOut}>Logout</button>
        </div>
    )
}
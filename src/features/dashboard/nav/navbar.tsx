import { FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMsal } from "@azure/msal-react";

export default function Navbar() {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const userName = activeAccount?.name || "anonymous user";

    const handleLogout = () => {
        instance.logoutRedirect();
    };

    return (
        <>
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-1.5 rounded-md shadow-sm">
                        <FileText className="text-white" size={20} />
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight uppercase">AI PPM Analysis Platform</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-semibold text-gray-900">{userName}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{activeAccount?.username || "Authorized User"}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                        <LogOut size={20} />
                    </Button>
                </div>
            </nav>
        </>
    )
}
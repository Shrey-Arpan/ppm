import DocumentListing from "./dashboard-children/documentListing";
import Navbar from "../nav/navbar";
import { Building2 } from "lucide-react";

export default function DashboardPage() {

    return (
         <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar/>
            <DocumentListing/>
            <footer className="py-8 text-center">
                <div className="flex items-center justify-center gap-6 mb-4 opacity-30 grayscale pointer-events-none">
                    <Building2 size={20} />
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                    <span className="text-[10px] font-black tracking-widest uppercase">Institutional Grade Platform</span>
                </div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest uppercase">&copy; {new Date().getFullYear()} AI PPM Analysis Platform &bull; Secure Enterprise Environment</p>
            </footer>
        </div>
    )
}
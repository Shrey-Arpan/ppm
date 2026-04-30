import DocumentListing from "./document-listing/documentListing";
import Navbar from "./nav/navbar";

export default function DashboardPage() {

    return (
         <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar/>
            <DocumentListing/>
        </div>
    )
}
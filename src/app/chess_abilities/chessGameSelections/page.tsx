'use client'
import HambagerMenu from "@/app/components/hamberger_menu"
import NavBar from "@/app/components/navBar"
import ProtectedRoute from "@/app/components/protectedRoute"

function ChessGameSelection () {
    return (
        <div className = "bg-chess-aesthetic-bg-brown flex flex-col min-h-screen">
            <div className = "flex py-2 px-2 gap-2 bg-chess-navs shadow-lg sticky top-o z-10">
                <HambagerMenu/>
                <h1 className = "text-white font-bold">.Chess games</h1>
            </div>
            {/* main page cont will go here */}
            <div className = "">
                <div>
                    this is a test text for the project
                </div>
            </div>
            <div className = 'sticky z-10 bottom-0'>
                <NavBar textColor="white" bg = "native-brown"/>
            </div>
        </div>
    )
}

export default function ChessGameSelectionPage() {
    return (
        <ProtectedRoute>
            <ChessGameSelection/>
        </ProtectedRoute>
    )
}
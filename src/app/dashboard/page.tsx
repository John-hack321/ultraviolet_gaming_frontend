'use client'
import NavBar from "../components/navBar"
import ProtectedRoute from "../components/protectedRoute"

function Dashboard() {
    return (
            <div className = "bg-white flex-col flex justify-between min-h-screen">
                <div className = "" >
                    <p className = " text-black  ">the Dashboard content will go here</p>
                </div>
                <NavBar/>
            </div>
    )
}

export default function DashboardPage () {
    return (
        <ProtectedRoute>
            <Dashboard/>
        </ProtectedRoute>
    )
}
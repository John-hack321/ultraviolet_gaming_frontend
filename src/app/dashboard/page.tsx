'use client'
import NavBar from "../components/navBar"
import ProtectedRoute from "../components/protectedRoute"

function Dashboard() {
    return (
            <div className = "bg-white flex-col flex justify-between min-h-screen">
                {/* the dashboard navbar here */}
                <div className = "" >
                    <h1 className = "text-black font-bold">.UVLT_GAMING</h1>
                    <div className = 'flex gap-2 p-2'>
                        <button className = "text-blue-800 rounded-lg bg-blue-100 text-sm p-2">
                            Quick Match</button>
                        <button className = "text-blue-800 rounded-lg bg-blue-100 p-2 text-sm">
                            Tournaments
                        </button>
                        <button className = "text-blue-800 rounded-lg bg-blue-100 p-2 text-sm">
                            Live matches
                        </button>
                    </div>
                </div>
                {/* navbar hero section */}
                <div>
                    {/* navbar hero text and relevant data */}
                </div>
                {/* time control section */}
                <div>
                    {/* time control chosing */}
                </div>
                {/* stake amount selector */}
                <div>

                </div>
                {/* mathc preferences */}
                <div>

                </div>
                {/* match making section */}
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
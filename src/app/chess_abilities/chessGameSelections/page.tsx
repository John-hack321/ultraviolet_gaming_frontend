'use client'
import ProtectedRoute from "@/app/components/protectedRoute"

function ChessGameSelection () {
    return (
        <div className = "bg-color-chess-aesthetic-bg-brown min-h-screen">
            <div className = "text-white">this is a test for this page</div>
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
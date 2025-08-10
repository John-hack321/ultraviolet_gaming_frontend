'use client'
import ProtectedRoute from "@/app/components/protectedRoute"

function ChessGameSelection () {
    return (
        <div className = "bg-chess_game_colors-chess_aesthetic_bg_brown min-h-screen">
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
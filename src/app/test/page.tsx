'use client'
// for testing chess reusability
import { Chessboard } from "react-chessboard"
import { useChessGame } from "../chess_abilities/chessConfigurations/chessConfig"

export default function TestPage() {

    const chessboardOptions = useChessGame();

    return (
        <div>
            <Chessboard options={chessboardOptions}/>
        </div>
    )
}
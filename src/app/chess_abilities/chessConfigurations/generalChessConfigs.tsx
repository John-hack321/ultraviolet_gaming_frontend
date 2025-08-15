// chess config functions 
import {Chess} from "chess.js";

export function generateRandomMoveFen (fen : string) : string | null {
    console.log('i have just been called John')
    try {
        const game = new Chess(fen)
        
        const possibleMoves = game.moves()

        if (possibleMoves && possibleMoves.length === 0) {
            console.log('there are no possible moves')
            return null;
        }

        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        if (!randomMove) {
            console.log('faliled to generate the reandom move')
            return null;
        }

        game.move(randomMove)
        return game.fen();

    }catch (error) {
        console.log('the generate random move function  failed')
        return null;
    }
}
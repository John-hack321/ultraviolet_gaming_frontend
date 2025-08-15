'use client'
import { Chess } from "chess.js"

class chessConfig {

    private chessGame : Chess;

    constructor (currentGame : Chess) {
        this.chessGame = currentGame;
    }

    private makeRandomMove () {
        // get the possible moves from the chessGame class
        const possibleMoves = this.chessGame.moves();
        // check if game is over 
        if (this.chessGame.isGameOver()){
            console.log('the game is over')
            return ; // return early if game is over
        }

        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

        this.chessGame.move(randomMove);

    }
}
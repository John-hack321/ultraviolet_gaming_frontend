export type Square = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' |
                     'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8' |
                     'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' |
                     'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8' |
                     'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8' |
                     'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' |
                     'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8' |
                     'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';


export type PieceColor = 'w' | 'b';
export type GameMode = 'pvp' | 'ai' | 'analysis' | 'puzzle';
export type PlayerSide = 'white' | 'black' | 'both';


export interface ChessGameState {
    position: string; // FEN string
    history: string[]; // Move history in algebraic notation
    turn: PieceColor;
    isGameOver: boolean;
    winner: PieceColor | null;
    gameMode: GameMode;
    playerSide: PlayerSide;
}


export interface EngineAnalysis {
    positionEvaluation: number;
    possibleMate: string | null;
    bestLine: string;
    depth: number;
    bestMove: string | null;
}

export interface ChessConfigOptions {
    gameMode: GameMode;
    playerSide: PlayerSide;
    engineDepth?: number;
    autoAnalysis?: boolean;
    showHints?: boolean;
    allowUndo?: boolean;
    timeControl?: {
      initial: number; // seconds
      increment: number; // seconds
    };
}

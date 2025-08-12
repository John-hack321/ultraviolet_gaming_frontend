'use client'
import Engine from "../engines/stockfish/engine";
import { Chess } from "chess.js";

{/* 
    this file contains the Reactchessboard-configuration functions
    everything from : onDrop to findBestMove are found here
*/}

export interface EngineAnalysis {
  positionEvaluation : number;
  possibleMate : string | null;
  bestLine : string;
  depth : number;
  bestMove : string | null;
}

export class ChessEngineManager {
  private engine : Engine;
  private analysis : EngineAnalysis;
  private isAnalyzing : boolean ;
  private onAnalysisUpdate ? : (analysis : EngineAnalysis) => void;

  constructor () {
    this.engine = new Engine();
    this.analysis = {
      positionEvaluation : 0,
      possibleMate : null,
      bestLine : '',
      depth : 0,
      bestMove : null
    };
    this.isAnalyzing = false;
    this.setupEngineListener();
  }

  private setupEngineListener () {
    this.engine.onMessage (({positionEvaluation , possibleMate , pv , depth}) => {
      // allways ignore the shallow analysis for the engine
      if (depth && depth < 10) {
        return;
      }

      // update the analysis
      if (positionEvaluation) {
        this.analysis.positionEvaluation = Number(positionEvaluation) /1000;
      }

      if (possibleMate) {
        this.analysis.possibleMate = possibleMate;
      }

      if (depth) {
        this.analysis.depth = depth;
      }

      if (pv) {
        this.analysis.bestLine = pv;
        this.analysis.bestMove = pv?.split(' ')[0];
      }

      this.isAnalyzing = false;

      if (this.onAnalysisUpdate) {
        this.onAnalysisUpdate({...this.analysis});
      }

    });
  }

  public findBestMove(chessGame : Chess , depth : number = 18) : void {
    this.isAnalyzing = true;
    this.engine.evaluatePosition(chessGame.fen() , depth)
  }

  public getAnalaysis() : EngineAnalysis {
    return {...this.analysis};
  }

  public isCurrentlyAnalyzing () : boolean {
    return this.isAnalyzing;
  }

  public setAnalysisUpdateCallback (callback : (analysis : EngineAnalysis) => void): void {
    this.onAnalysisUpdate = callback;
  }

  public stop() : void {
    this.engine.stop();
    this.isAnalyzing = false;
  }

  public terminate() : void {
    this.engine.terminate();
    this.isAnalyzing = false;
  }

  // a helper method to get the evaluation for display
  public getDisplayEvaluation() : string {
    if ( this.analysis.possibleMate ) {
      return `#${this.analysis.possibleMate}`;
    }
    return this.analysis.positionEvaluation.toString();
  }

  // another helper method but now for geting the best move with color adjustment
  public getAdjustedEvaluation(currentTurn : 'w' | 'b') : number {
    const multiplier = currentTurn === 'w' ? 1 : -1;
    return this.analysis.positionEvaluation * multiplier;
  }

}
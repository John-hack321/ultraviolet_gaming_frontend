type EngineMessage = {
  /** stockfish engine message in UCI format */
  uciMessage: string;
  /** found best move for current position in format `e2e4` */
  bestMove?: string;
  /** found best move for opponent in format `e7e5` */
  ponder?: string;
  /** material balance's difference in centipawns */
  positionEvaluation?: string;
  /** count of moves until mate */
  possibleMate?: string;
  /** the best line found */
  pv?: string;
  /** number of halfmoves the engine looks ahead */
  depth?: number;
};

export default class Engine {
  private stockfish: Worker | null = null;
  private messageCallbacks: ((message: EngineMessage) => void)[] = [];
  public isReady: boolean = false;

  constructor() {
    // Only initialize in browser environment
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    try {
      this.stockfish = new Worker('/stockfish.wasm.js');
      
      this.stockfish.onmessage = (e: MessageEvent<string>) => {
        const message = this.transformSFMessageData(e);
        this.messageCallbacks.forEach(callback => callback(message));

        if (message.uciMessage === 'readyok') {
          this.isReady = true;
        }
      };

      this.stockfish.onerror = (error) => {
        console.error('Stockfish worker error:', error);
      };

      this.stockfish.postMessage('uci');
      this.stockfish.postMessage('isready');
      
    } catch (error) {
      console.error('Failed to initialize Stockfish worker:', error);
    }
  }

  private transformSFMessageData(e: MessageEvent<string>): EngineMessage {
    const uciMessage = e?.data ?? '';
    
    return {
      uciMessage,
      bestMove: uciMessage.match(/bestmove\s+(\S+)/)?.[1],
      ponder: uciMessage.match(/ponder\s+(\S+)/)?.[1],
      positionEvaluation: uciMessage.match(/cp\s+(\S+)/)?.[1],
      possibleMate: uciMessage.match(/mate\s+(\S+)/)?.[1],
      pv: uciMessage.match(/ pv\s+(.*)/)?.[1],
      depth: Number(uciMessage.match(/ depth\s+(\S+)/)?.[1] ?? 0),
    };
  }

  onMessage(callback: (message: EngineMessage) => void): void {
    this.messageCallbacks.push(callback);
  }

  onReady(callback: () => void): void {
    const readyCheck = (message: EngineMessage) => {
      if (message.uciMessage === 'readyok') {
        callback();
        this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== readyCheck);
      }
    };
    this.onMessage(readyCheck);
  }

  evaluatePosition(fen: string, depth = 12): void {
    if (!this.stockfish || !this.isReady) {
      console.warn('Stockfish worker not ready');
      return;
    }

    if (depth > 24) depth = 24;

    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }

  stop(): void {
    if (this.stockfish && this.isReady) {
      this.stockfish.postMessage('stop');
    }
  }

  terminate(): void {
    if (this.stockfish) {
      this.stop();
      this.stockfish.postMessage('quit');
      this.stockfish.terminate();
      this.stockfish = null;
      this.isReady = false;
    }
    this.messageCallbacks = [];
  }
}

import { ChessPiece } from "./ChessPiece";
import { POSITION } from "./chess";
export declare class Board {
    grid: (ChessPiece | null)[][];
    constructor();
    addPiece(piece: ChessPiece, position: POSITION): void;
    movePiece(from: POSITION, to: POSITION): void;
    print(): void;
}

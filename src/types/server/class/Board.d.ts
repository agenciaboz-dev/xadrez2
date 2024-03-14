import { Socket } from "socket.io";
import { ChessPiece } from "./ChessPiece";
import { POSITION } from "./chess";
export type Chessboard = (ChessPiece | null)[][];
export declare class Board {
    grid: Chessboard;
    constructor();
    addPiece(piece: ChessPiece, position: POSITION): void;
    movePiece(from: POSITION, to: POSITION): Chessboard;
    print(): void;
    getPiece(position: POSITION): ChessPiece | null;
    getPieceMovements(position: POSITION, socket?: Socket): POSITION[];
}

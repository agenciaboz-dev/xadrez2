import { ChessPiece } from "./ChessPiece";
import { COLOR } from "./chess";
export declare class Player {
    id: string;
    color: COLOR;
    pieces: ChessPiece[];
    constructor(color: COLOR, id: string);
    initializePieces(): void;
}

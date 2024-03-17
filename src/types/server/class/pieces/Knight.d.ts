import { Chessboard } from "../Board";
import { COLOR, POSITION } from "../chess";
import { Piece } from "./Piece";
export declare class Knight extends Piece {
    label: string;
    constructor(color: COLOR, position: POSITION);
    canMove(target_position: POSITION, grid: Chessboard): boolean;
}

import { COLOR, Chessboard, POSITION } from "../chess";
import { Piece } from "./Piece";
export declare class Bishop extends Piece {
    label: string;
    constructor(color: COLOR, position: POSITION);
    canMove(target_position: POSITION, grid: Chessboard): boolean;
}

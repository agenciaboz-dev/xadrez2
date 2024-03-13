import { ChessPiece } from "../ChessPiece";
import { COLOR, POSITION } from "../chess";
export declare class Piece {
    color: COLOR;
    position: POSITION;
    constructor(color: COLOR, position: POSITION);
    canMove(target_position: POSITION, grid: (ChessPiece | null)[][]): boolean;
    canAttack(target_position: POSITION): boolean;
}

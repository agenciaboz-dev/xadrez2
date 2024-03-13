import { ChessPiece } from "../ChessPiece";
import { COLOR, POSITION } from "../chess";
import { Piece } from "./Piece";
export declare class Pawn extends Piece {
    label: string;
    constructor(color: COLOR, position: POSITION);
    canMove(target_position: POSITION, grid: (ChessPiece | null)[][]): boolean;
    canAttack(target_position: POSITION): boolean;
}

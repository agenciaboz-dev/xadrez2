import { COLOR, Chessboard, POSITION } from "../chess";
export declare class Piece {
    color: COLOR;
    position: POSITION;
    label: string;
    constructor(color: COLOR, position: POSITION);
    canMove(target_position: POSITION, grid: Chessboard): boolean;
    canAttack(target_position: POSITION): boolean;
    move(from: POSITION, to: POSITION, grid: Chessboard): void;
}

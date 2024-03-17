import { Chessboard } from "../Board";
import { COLOR, POSITION } from "../chess";
export declare class Piece {
    color: COLOR;
    position: POSITION;
    label: string;
    moved_times: number;
    constructor(color: COLOR, position: POSITION);
    canMove(target_position: POSITION, grid: Chessboard): boolean;
    canAttack(target_position: POSITION): boolean;
    move(from: POSITION, to: POSITION, grid: Chessboard): void;
    getPositionDiffs(target_position: POSITION): {
        diff_x: number;
        diff_y: number;
    };
}

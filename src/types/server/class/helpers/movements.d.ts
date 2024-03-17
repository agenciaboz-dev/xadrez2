import { Chessboard } from "../Board";
import { ChessPiece } from "../ChessPiece";
import { POSITION } from "../chess";
declare function tower(piece: ChessPiece, target_position: POSITION, grid: Chessboard): boolean;
declare const _default: {
    tower: typeof tower;
};
export default _default;

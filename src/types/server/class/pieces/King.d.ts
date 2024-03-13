import { COLOR, POSITION } from "../chess";
import { Piece } from "./Piece";
export declare class King extends Piece {
    label: string;
    constructor(color: COLOR, position: POSITION);
}

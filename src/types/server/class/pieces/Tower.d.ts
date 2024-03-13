import { COLOR, POSITION } from "../chess";
import { Piece } from "./Piece";
export declare class Tower extends Piece {
    label: string;
    constructor(color: COLOR, position: POSITION);
}

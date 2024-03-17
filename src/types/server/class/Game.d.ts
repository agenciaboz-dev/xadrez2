import { Board } from "./Board";
import { Player } from "./Player";
import { COLOR, STATUS } from "./chess";
export declare class Game {
    board: Board;
    players: Player[];
    current_turn: COLOR;
    status: STATUS;
    constructor();
    switchTurn(): void;
    addPlayer(player: Player): void;
}

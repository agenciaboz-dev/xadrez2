import { Game } from "./Game";
import { Socket } from "socket.io";
import { COLOR, POSITION } from "./chess";
import { WithoutFunctions } from "./helpers";
export type RoomForm = Omit<WithoutFunctions<Room>, "id" | "game" | "players">;
export declare let rooms: Room[];
export declare class Room {
    id: string;
    game: Game;
    name: string;
    password: string;
    constructor(data: RoomForm, socket: Socket);
    static list(socket: Socket): void;
    static find(socket: Socket): Room | undefined;
    static printBoard(socket: Socket): void;
    static join(room_id: string, password: string, socket: Socket): void;
    static handleDisconnect(socket: Socket): void;
    static movePiece(socket: Socket, from: POSITION, to: POSITION): void;
    startGame(): void;
    join(socket: Socket, color: COLOR): void;
}

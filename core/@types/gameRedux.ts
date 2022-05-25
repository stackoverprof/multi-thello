export interface GameStateType {
	board: number[][];
	turn: number;
	players: number[];
}

export interface GameActionsType {
	setBoard(val: any): void;
	setPlayers(val: any): void;
	setTurn(val: number): void;
}

export interface UseGameType extends GameStateType, GameActionsType {
	initiateBoard(size: number): void;
	initiatePlayer(playerSize: number): void;
	handleSelect(x: number, y: number): void;
}

export interface GameStateType {
	board: number[][];
	turn: number;
	players: number[];
	tileStatus: boolean[][];
}

export interface GameActionsType {
	setBoard(val: any): void;
	setPlayers(val: any): void;
	setTurn(val: number): void;
	setTileStatus(val: boolean): void;
	reset(): void;
}

export interface UseGameType extends GameStateType, GameActionsType {
	scores: { player: number; score: number }[];
	start(config: { player: number; board: number }): void;
	handleSelect(selected: ChipDataType): void;
}

export type ChipDataType = { x: number; y: number; value?: number };

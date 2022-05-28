export interface GameStateType {
	status: StatusType;
	board: BoardType;
	turn: number;
	players: PlayersType;
	tileStatus: TileStatusType;
}

export interface GameActionsType {
	setStatus(val: StatusType): void;
	setBoard(val: BoardType): void;
	setPlayers(val: PlayersType): void;
	setTurn(val: number): void;
	setTileStatus(val: TileStatusType): void;
	reset(): void;
}

export interface UseGameType extends GameStateType, GameActionsType {
	start(config: { player: number; board: number }): void;
	scores: { player: number; score: number }[];
	gameOver: boolean;
	winner: number;
	handleSelect(selected: ChipDataType | 'none'): void;
}

export type ChipDataType = { x: number; y: number; value?: number };

export interface StartOptionsType {
	player?: number;
	board?: number;
}

export type StatusType = 'initial' | 'playing' | 'paused';
export type BoardType = number[][];
export type TileStatusType = boolean[][];
export type PlayersType = number[];

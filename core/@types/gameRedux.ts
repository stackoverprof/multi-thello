export interface GameStateType {
	status: StatusType;
	board: BoardType;
	turn: number;
	players: PlayersType;
	tileStatus: TileStatusType;
	selected: ChipDataType | null;
}

export interface GameActionsType {
	setStatus(val: StatusType): void;
	setBoard(val: BoardType): void;
	setPlayers(val: PlayersType): void;
	setTurn(val: number): void;
	setTileStatus(val: TileStatusType): void;
	setSelected(val: ChipDataType | null): void;
	reset(): void;
}

export interface UseGameType extends GameStateType, GameActionsType {
	start(config: { player: number; board: number }): void;
	scores: { player: number; score: number }[];
	gameOver: boolean;
	winners: number[];
	handleSelect(selected: ChipDataType | 'none'): void;
}

export type ChipDataType = { x: number; y: number; value?: number };

export interface StartOptionsType {
	player: number;
	board: number;
}

export type StatusType = 'initial' | 'playing' | 'paused';
export type BoardType = number[][];
export type TileStatusType = boolean[][];
export type PlayersType = number[];

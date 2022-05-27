import { createSlice } from '@reduxjs/toolkit';
import { GameActionsType, GameStateType } from '@core/@types/gameRedux';

const DEFAULT_PLAYER = 4;
const DEFAULT_BOARD = 8;

export const initialState: GameStateType = {
	status: 'initial',
	board: Array(DEFAULT_BOARD).fill(Array(DEFAULT_BOARD).fill(0)),
	turn: 1,
	players: Array(DEFAULT_PLAYER)
		.fill(null)
		.map((_, i) => i + 1),
	tileStatus: Array(DEFAULT_BOARD).fill(Array(DEFAULT_BOARD).fill(false)),
};

const ReduxSlice = createSlice({
	name: 'GAME',
	initialState,
	reducers: {
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setBoard: (state, action) => {
			state.board = action.payload;
		},
		setPlayers: (state, action) => {
			state.players = action.payload;
		},
		setTurn: (state, action) => {
			state.turn = action.payload;
		},
		setTileStatus: (state, action) => {
			state.tileStatus = action.payload;
		},
		reset: () => initialState,
	},
});

export const actions: GameActionsType = ReduxSlice.actions;
export default ReduxSlice.reducer;

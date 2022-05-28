import { createSlice } from '@reduxjs/toolkit';
import { GameActionsType, GameStateType } from '@core/@types/gameRedux';

export const initialState: GameStateType = {
	status: 'initial',
	board: [],
	turn: 1,
	players: [],
	tileStatus: [],
	selected: null,
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
		setSelected: (state, action) => {
			state.selected = action.payload;
		},
		reset: () => initialState,
	},
});

export const actions: GameActionsType = ReduxSlice.actions;
export default ReduxSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { GameActionsType, GameStateType } from '@core/@types/gameRedux';

const initialState: GameStateType = {
	board: [],
	turn: 1,
	players: [],
};

const ReduxSlice = createSlice({
	name: 'GAME',
	initialState,
	reducers: {
		setBoard: (state, action) => {
			state.board = action.payload;
		},
		setPlayers: (state, action) => {
			state.players = action.payload;
		},
		setTurn: (state, action) => {
			state.turn = action.payload;
		},
	},
});

export const actions: GameActionsType = ReduxSlice.actions;
export default ReduxSlice.reducer;

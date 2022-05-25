import { actions } from '../reducers/game';
import { RootState } from '../store';
import { useAutoDispatcher } from '../root';
import { UseGameType } from '@core/@types/gameRedux';
import { useSelector } from 'react-redux';

export const useGame = (): UseGameType => {
	const state = useSelector((state: RootState) => state.game);
	const dispatcher = useAutoDispatcher(actions);

	const initiateBoard = (size) => {
		const initial = [...Array(size)].fill([...Array(size)].fill(0));
		dispatcher.setBoard(initial);
	};

	const initiatePlayer = (playerSize) => {
		const ids = [...Array(playerSize)].map((_, i) => i + 1);
		dispatcher.setPlayers(ids);
	};

	const nextTurn = () => {
		const currentIndex = state.players.findIndex((x) => x === state.turn);
		const nextIndex = currentIndex + 1 === state.players.length ? 0 : currentIndex + 1;
		const nextId = state.players[nextIndex];
		dispatcher.setTurn(nextId);
	};

	const handleSelect = (x: number, y: number) => {
		const updated = state.board.map((cols, i) =>
			cols.map((val, j) => {
				if (x === i && y === j) return state.turn;
				else return val;
			})
		);
		dispatcher.setBoard(updated);
		nextTurn();
	};

	return {
		...state,
		...dispatcher,
		initiateBoard,
		initiatePlayer,
		handleSelect,
	};
};

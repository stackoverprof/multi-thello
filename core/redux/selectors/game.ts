import { actions } from '../reducers/game';
import { ChipDataType, UseGameType } from '@core/@types/gameRedux';
import { RootState } from '../store';
import { useAutoDispatcher } from '../root';
import { useSelector } from 'react-redux';

export const useGame = (): UseGameType => {
	const state = useSelector((state: RootState) => state.game);
	const dispatcher = useAutoDispatcher(actions);

	const initiateBoard = (size) => {
		const initial = Array(size).fill(Array(size).fill(0));
		dispatcher.setBoard(initial);
	};

	const initiatePlayer = (playerSize) => {
		const ids = Array(playerSize)
			.fill(null)
			.map((_, i) => i + 1);
		dispatcher.setPlayers(ids);
	};

	const nextTurn = () => {
		const currentIndex = state.players.findIndex((x) => x === state.turn);
		const nextIndex = currentIndex + 1 === state.players.length ? 0 : currentIndex + 1;
		const nextId = state.players[nextIndex];
		dispatcher.setTurn(nextId);
	};

	const handleSelect = (selected: ChipDataType) => {
		const flipped = flipChips(selected);
		const updated = flipped.map((cols, i) =>
			cols.map((val, j) => {
				if (selected.x === i && selected.y === j) return state.turn;
				else return val;
			})
		);

		dispatcher.setBoard(updated);
		nextTurn();
	};

	const flipChips = (selected: ChipDataType) => {
		const enemyNeighbors = (() => {
			const xNeighbors = [selected.x - 1, selected.x, selected.x + 1];
			const yNeighbors = [selected.y - 1, selected.y, selected.y + 1];
			const neighbors = xNeighbors.map((x) => yNeighbors.map((y) => ({ x, y })));
			return neighbors
				.flat()
				.filter(({ x, y }) => x >= 0 && y >= 0)
				.filter(({ x, y }) => x < state.board.length && y < state.board.length)
				.filter(({ x: _x, y: _y }) => _x !== selected.x || _y !== selected.y)
				.filter(({ x, y }) => state.board[x][y] !== 0)
				.map(({ x, y }) => ({ x, y, value: state.board[x][y] }))
				.filter(({ value }) => value !== state.turn);
		})();

		const tobeFlippedCombined = enemyNeighbors
			.map((neighbor: ChipDataType) => {
				const tobeFlipped = [];

				const checkNext = (current: ChipDataType) => {
					tobeFlipped.push(current);

					const getNextCoord = (a: number, b: number) => {
						const subs = a - b;
						if (subs > 0) return b - 1;
						else if (subs < 0) return b + 1;
						else return b;
					};

					const xn = getNextCoord(selected.x, current.x);
					const yn = getNextCoord(selected.y, current.y);

					const isOffGrid =
						xn < 0 || yn < 0 || xn >= state.board.length || yn >= state.board.length;

					if (isOffGrid) return false;

					const next = {
						x: xn,
						y: yn,
						value: state.board[xn][yn],
					};

					if (next.value === 0) return false;
					else if (next.value === state.turn) return true;
					else return checkNext(next);
				};

				const isFlipping = checkNext(neighbor);
				if (isFlipping) return tobeFlipped;
				else return [];
			})
			.flat();

		const updated = state.board.map((cols, i) =>
			cols.map((val, j) => {
				if (tobeFlippedCombined.find(({ x, y }) => x === i && y === j)) return state.turn;
				else return val;
			})
		);

		return updated;
	};

	return {
		...state,
		...dispatcher,
		initiateBoard,
		initiatePlayer,
		handleSelect,
	};
};

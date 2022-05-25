import { actions } from '../reducers/game';
import { RootState } from '../store';
import { useAutoDispatcher } from '../root';
import { UseGameType } from '@core/@types/gameRedux';
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

	const handleSelect = (x: number, y: number) => {
		const flipped = flipChips(x, y);
		const updated = flipped.map((cols, i) =>
			cols.map((val, j) => {
				if (x === i && y === j) return state.turn;
				else return val;
			})
		);

		dispatcher.setBoard(updated);
		nextTurn();
	};

	const flipChips = (x: number, y: number) => {
		const getNeighbors = () => {
			const xNeighbors = [x - 1, x, x + 1];
			const yNeighbors = [y - 1, y, y + 1];
			const neighbors = xNeighbors.map((xn) => yNeighbors.map((yn) => ({ x: xn, y: yn })));
			return neighbors
				.flat()
				.filter(({ x, y }) => x >= 0 && y >= 0)
				.filter(({ x, y }) => x < state.board.length && y < state.board.length)
				.filter(({ x: _x, y: _y }) => _x !== x || _y !== y);
		};

		const enemyNeighbors = getNeighbors()
			.filter(({ x, y }) => state.board[x][y] !== 0)
			.map(({ x, y }) => ({ x, y, value: state.board[x][y] }))
			.filter(({ value }) => value !== state.turn);

		const tobeFlippedCombined = enemyNeighbors
			.map((neighbor) => {
				const current = { x, y };

				const tobeFlipped = [];

				const checkNext = (x: number, y: number) => {
					const getNextCoord = (a: number, b: number) => {
						const subs = a - b;
						if (subs > 0) return b - 1;
						else if (subs < 0) return b + 1;
						else return b;
					};

					const xnext = getNextCoord(current.x, x);
					const ynext = getNextCoord(current.y, y);

					const next = {
						x: xnext,
						y: ynext,
						value: state.board[xnext][ynext],
					};

					if (
						next.x < 0 ||
						next.y < 0 ||
						next.x >= state.board.length ||
						next.y >= state.board.length
					) {
						return false;
					} else if (next.value === 0) {
						return false;
					} else if (next.value === state.turn) {
						console.log('iya sama');
						return true;
					} else {
						tobeFlipped.push(next);
						console.log('checking', next.x, next.y, next.value);
						return checkNext(next.x, next.y);
					}
				};

				tobeFlipped.push(neighbor);

				console.log('checking', neighbor.x, neighbor.y, neighbor.value);
				const isFlipping = checkNext(neighbor.x, neighbor.y);

				console.log(isFlipping);
				if (isFlipping) {
					return tobeFlipped;
				} else return [];
			})
			.flat();

		const flipResult = state.board.map((cols, x) =>
			cols.map((val, y) => {
				if (tobeFlippedCombined.find((coor) => coor.x === x && coor.y === y))
					return state.turn;
				else return val;
			})
		);
		return flipResult;
	};

	return {
		...state,
		...dispatcher,
		initiateBoard,
		initiatePlayer,
		handleSelect,
	};
};

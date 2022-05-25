import { actions } from '../reducers/game';
import { ChipDataType, UseGameType } from '@core/@types/gameRedux';
import { RootState } from '../store';
import { useAutoDispatcher } from '../root';
import { useSelector } from 'react-redux';

export const useGame = (): UseGameType => {
	const state = useSelector((state: RootState) => state.game);
	const dispatcher = useAutoDispatcher(actions);

	// GAME INITIATION
	const start = ({ player = 4, board = 8 }) => {
		dispatcher.reset();
		initiatePlayer(player);
		initiateBoard(board);
	};

	const initiatePlayer = (playerSize) => {
		const ids = Array(playerSize)
			.fill(null)
			.map((_, i) => i + 1);
		dispatcher.setPlayers(ids);
	};

	const initiateBoard = (size) => {
		const initialBoard = Array(size).fill(Array(size).fill(0));
		dispatcher.setBoard(initialBoard);
		initiateTiles(size);
	};

	const initiateTiles = (size) => {
		const filterByNoEdge = (tiles) =>
			tiles.map((cols, x) =>
				cols.map((_, y) => {
					return x > 0 && x < tiles.length - 1 && y > 0 && y < tiles.length - 1;
				})
			);
		const initialTiles = filterByNoEdge(Array(size).fill(Array(size).fill(true)));
		dispatcher.setTileStatus(initialTiles);
	};

	// GAME PLAY FUNCTIONS
	const handleSelect = (selected: ChipDataType) => {
		const gained = [...getFlippingChips(selected, state.turn, state.board), selected];
		const updated = state.board.map((cols, i) =>
			cols.map((val, j) => {
				if (gained.find(({ x, y }) => x === i && y === j)) return state.turn;
				else return val;
			})
		);

		updateTileStatus(updated);
		dispatcher.setBoard(updated);
		dispatcher.setTurn(getNextPlayer());
	};

	// UPDATING FOR NEXT TURN
	const getNextPlayer = () => {
		const currentIndex = state.players.findIndex((x) => x === state.turn);
		const nextIndex = currentIndex + 1 === state.players.length ? 0 : currentIndex + 1;
		return state.players[nextIndex];
	};

	const getFlippingChips = (selected: ChipDataType, turn: number, board: number[][]) => {
		const enemyNeighbors = (() => {
			const xNeighbors = [selected.x - 1, selected.x, selected.x + 1];
			const yNeighbors = [selected.y - 1, selected.y, selected.y + 1];
			const neighbors = xNeighbors.map((x) => yNeighbors.map((y) => ({ x, y })));
			return neighbors
				.flat()
				.filter(({ x, y }) => x >= 0 && y >= 0)
				.filter(({ x, y }) => x < board.length && y < board.length)
				.filter(({ x: _x, y: _y }) => _x !== selected.x || _y !== selected.y)
				.filter(({ x, y }) => board[x][y] !== 0)
				.map(({ x, y }) => ({ x, y, value: board[x][y] }))
				.filter(({ value }) => value !== turn);
		})();

		const flippingChipsCombined = enemyNeighbors
			.map((neighbor: ChipDataType) => {
				const flippingChips = [];

				const checkNext = (current: ChipDataType) => {
					flippingChips.push(current);

					const getNextCoord = (a: number, b: number) => {
						const subs = a - b;
						if (subs > 0) return b - 1;
						else if (subs < 0) return b + 1;
						else return b;
					};

					const xn = getNextCoord(selected.x, current.x);
					const yn = getNextCoord(selected.y, current.y);

					const isOffGrid = xn < 0 || yn < 0 || xn >= board.length || yn >= board.length;

					if (isOffGrid) return false;

					const next = {
						x: xn,
						y: yn,
						value: board[xn][yn],
					};

					if (next.value === 0) return false;
					else if (next.value === turn) return true;
					else return checkNext(next);
				};

				const isFlipping = checkNext(neighbor);
				if (isFlipping) return flippingChips;
				else return [];
			})
			.flat();

		return flippingChipsCombined;
	};

	const updateTileStatus = (board) => {
		const filterByValue = (tiles) =>
			tiles.map((cols, x) =>
				cols.map((_, y) => {
					return board[x][y] === 0;
				})
			);

		const filterByNeighborhood = (tiles) =>
			tiles.map((cols, x) =>
				cols.map((_, y) => {
					if (board[x][y]) return false;

					const getOccupiedNeighbors = () => {
						const xNeighbors = [x - 1, x, x + 1];
						const yNeighbors = [y - 1, y, y + 1];
						const neighbors = xNeighbors.map((xn) =>
							yNeighbors.map((yn) => ({ x: xn, y: yn }))
						);
						return neighbors
							.flat()
							.filter(({ x, y }) => x >= 0 && y >= 0)
							.filter(({ x, y }) => x < board.length && y < board.length)
							.filter(({ x: _x, y: _y }) => _x !== x || _y !== y)
							.filter(({ x, y }) => board[x][y] !== 0);
					};

					const hasOccupiedNeighbors = getOccupiedNeighbors().length > 0;

					return hasOccupiedNeighbors;
				})
			);

		const filterByFlippingPossibility = (tiles) =>
			tiles.map((cols, x) =>
				cols.map((val, y) => {
					if (!val) return false;
					const checkFlippingPossibility = (selected) => {
						const flippable = getFlippingChips(selected, getNextPlayer(), board);
						return flippable.length > 0;
					};
					const flippingPossibility = checkFlippingPossibility({ x, y });
					return flippingPossibility;
				})
			);

		const step1 = filterByValue(state.tileStatus);
		const step2 = filterByNeighborhood(step1);
		const step3 = filterByFlippingPossibility(step2);
		const stucked = step3.flat().filter((val) => val).length === 0;
		const result = stucked ? step2 : step3;

		dispatcher.setTileStatus(result);
	};

	return {
		...state,
		...dispatcher,
		start,
		handleSelect,
	};
};

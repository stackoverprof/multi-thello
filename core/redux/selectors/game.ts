import { actions } from '../reducers/game';
import { ChipDataType, StartOptionsType, UseGameType } from '@core/@types/gameRedux';
import { RootState } from '../store';
import { useAutoDispatcher } from '../root';
import { useSelector } from 'react-redux';

export const useGame = (): UseGameType => {
	const state = useSelector((store: RootState) => store.game);
	const dispatcher = useAutoDispatcher(actions);

	// INITIATOR
	const initiatePlayer = (playerSize) => {
		const ids = Array(playerSize)
			.fill(null)
			.map((_, i) => i + 1);
		dispatcher.setPlayers(ids);
	};

	const initiateMultiThello = (size) => {
		const initialBoard = Array(size).fill(Array(size).fill(0));
		const initialTiles = filterByNoEdge(Array(size).fill(Array(size).fill(true)));

		dispatcher.setBoard(initialBoard);
		dispatcher.setTileStatus(initialTiles);
	};

	const initiateOThello = (size) => {
		const getBoardTemplate = (size) => {
			const initialBoard = Array(size).fill(Array(size).fill(0));
			if (size < 4) return initialBoard;
			const isOdd = !!(size % 2);
			if (isOdd) {
				const median = (size - 1) / 2;
				const a = median - 1;
				const b = median + 1;
				const valued = [
					{ x: a, y: median, value: 1 },
					{ x: b, y: median, value: 1 },
					{ x: median, y: b, value: 2 },
					{ x: median, y: a, value: 2 },
				];
				return rewriteBoard(valued, initialBoard);
			} else {
				const median = (size - 1) / 2;
				const a = median - 0.5;
				const b = median + 0.5;
				const valued = [
					{ x: a, y: a, value: 1 },
					{ x: b, y: b, value: 1 },
					{ x: a, y: b, value: 2 },
					{ x: b, y: a, value: 2 },
				];
				return rewriteBoard(valued, initialBoard);
			}
		};

		const boardTemplate = getBoardTemplate(size);
		const template = Array(size).fill(Array(size).fill(false));
		const updatedTiles = getTilesUpdate(template, boardTemplate, state.turn);

		dispatcher.setBoard(boardTemplate);
		dispatcher.setTileStatus(updatedTiles);
	};

	// BOARD CHIPS VALUES LOGIC
	const getFlippingChips = (selected: ChipDataType, board: number[][], turn: number) => {
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

	const rewriteBoard = (gained: ChipDataType[], board: number[][]) =>
		board.map((cols, i) =>
			cols.map((val, j) => {
				const found = gained.find(({ x, y }) => x === i && y === j);
				if (found) return found.value;
				else return val;
			})
		);

	const getNextPlayer = (players: number[], turn: number) => {
		const currentIndex = players.findIndex((x) => x === turn);
		const nextIndex = currentIndex + 1 === players.length ? 0 : currentIndex + 1;
		return players[nextIndex];
	};

	// TILES PICKABILITY LOGIC
	const filterByValue = (tiles, board) =>
		tiles.map((cols, x) => cols.map((_, y) => board[x][y] === 0));

	const filterByNoEdge = (tiles) => {
		if (tiles.length < 3) return tiles;
		return tiles.map((cols, x) =>
			cols.map((_, y) => {
				return x > 0 && x < tiles.length - 1 && y > 0 && y < tiles.length - 1;
			})
		);
	};

	const filterByNeighborhood = (tiles, board) =>
		tiles.map((cols, x) =>
			cols.map((_, y) => {
				const current = { x, y };
				if (board[current.x][current.y]) return false;

				const getOccupiedNeighbors = () => {
					const xNeighbors = [current.x - 1, current.x, current.x + 1];
					const yNeighbors = [current.y - 1, current.y, current.y + 1];
					const neighbors = xNeighbors.map((x) => yNeighbors.map((y) => ({ x, y })));

					return neighbors
						.flat()
						.filter(({ x, y }) => x >= 0 && y >= 0)
						.filter(({ x, y }) => x < board.length && y < board.length)
						.filter(({ x, y }) => x !== current.x || y !== current.y)
						.filter(({ x, y }) => board[x][y] !== 0);
				};

				return getOccupiedNeighbors().length > 0;
			})
		);

	const filterByFlippingPossibility = (tiles, board, turn) =>
		tiles.map((cols, x) =>
			cols.map((val, y) => {
				if (!val) return false;
				const checkFlippingPossibility = (selected) => {
					const flippable = getFlippingChips(selected, board, turn);
					return flippable.length > 0;
				};
				return checkFlippingPossibility({ x, y });
			})
		);

	const getTilesUpdate = (prev: boolean[][], board: number[][], turn: number) => {
		const step1 = filterByValue(prev, board);
		if (step1.flat().filter((val) => !val).length === 0) return filterByNoEdge(step1);
		const step2 = filterByNeighborhood(step1, board);
		if (step2.flat().filter((val) => val).length === 0) return step1;
		const step3 = filterByFlippingPossibility(step2, board, turn);
		if (step3.flat().filter((val) => val).length === 0) return step2;
		return step3;
	};

	const validateSelection = ({ x, y }) => state.tileStatus[x][y];

	// EXPORTED HOOK PRODUCT
	const start = ({ player, board }: StartOptionsType) => {
		dispatcher.reset();
		dispatcher.setStatus('initial');

		initiatePlayer(player);
		if (player === 2) initiateOThello(board);
		else initiateMultiThello(board);
	};

	const scores = (() => {
		const base = [...state.players.map((player) => ({ player, score: 0 }))];

		return base.map((item) => ({
			...item,
			score: state.board.flat().filter((v) => v === item.player).length,
		}));
	})();

	const gameOver = state.board.flat().filter((val) => !val).length === 0;

	const winners = (() => {
		if (!gameOver) return [];
		const highestScore = scores.map((data) => data.score).sort((a, b) => b - a)[0];
		return scores.filter((data) => data.score === highestScore).map((data) => data.player);
	})();

	const setSelected = (selected: ChipDataType | null) => {
		if (selected === null) {
			dispatcher.setSelected(null);
		} else if (validateSelection(selected)) {
			dispatcher.setSelected(selected);
		}
	};

	const handleSelect = (selected: ChipDataType | null) => {
		const updatedTurn = getNextPlayer(state.players, state.turn);
		dispatcher.setTurn(updatedTurn);

		const gained = selected
			? [...getFlippingChips(selected, state.board, state.turn), selected]
			: [];
		const valued = gained.map((tile) => ({ ...tile, value: state.turn }));
		const updatedBoard = rewriteBoard(valued, state.board);
		const updatedTiles = getTilesUpdate(state.tileStatus, updatedBoard, updatedTurn);

		dispatcher.setTileStatus(updatedTiles);
		dispatcher.setBoard(updatedBoard);
	};

	return {
		...state,
		...dispatcher,
		start,
		scores,
		gameOver,
		winners,
		setSelected,
		handleSelect,
	};
};

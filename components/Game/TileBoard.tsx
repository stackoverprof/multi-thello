import React from 'react';
import { useGame } from '@core/redux/selectors/game';

interface Props {
	value: number;
	x: number;
	y: number;
}

const getColor = (seed: number) => {
	return ['#ff8a80', '#80d8ff', '#ffd740', '#69f0ae', '#b388ff', '#795548'][seed - 1];
};

const TileBoard = ({ value, x, y }: Props) => {
	const { board, handleSelect } = useGame();

	const getNeighbors = () => {
		const xNeighbors = [x - 1, x, x + 1];
		const yNeighbors = [y - 1, y, y + 1];
		const neighbors = xNeighbors.map((xn) => yNeighbors.map((yn) => ({ x: xn, y: yn })));
		return neighbors
			.flat()
			.filter(({ x, y }) => x >= 0 && y >= 0)
			.filter(({ x, y }) => x < board.length && y < board.length)
			.filter(({ x: _x, y: _y }) => _x !== x || _y !== y);
	};

	const anyOccupiedNeighbors = () => {
		const neighbors = getNeighbors();
		console.log(x, y, neighbors);

		const occupiedNeighbors = neighbors.filter(({ x, y }) => board[x][y] !== 0);

		const boardEmpty = board.filter((cols) => cols.filter((val) => val).length).length === 0;
		console.log(boardEmpty);

		return !!occupiedNeighbors.length || boardEmpty;
	};

	const pickable = anyOccupiedNeighbors();

	return (
		<button
			disabled={!!value || !pickable}
			className={[
				'flex-cc m-1 w-12 h-12 bg-gray-100',
				!!value || !pickable ? 'cursor-not-allowed' : 'cursor-pointer',
			].join(' ')}
			onClick={() => handleSelect(x, y)}
			key={`${x},${y}`}
		>
			{!value && pickable ? (
				<p className="text-gray-300">
					{x}, {y}
				</p>
			) : (
				<></>
			)}
			{!!value && (
				<div
					className="w-12 h-12 rounded-full"
					style={{
						backgroundColor: getColor(value),
					}}
				></div>
			)}
		</button>
	);
};

export default TileBoard;


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

	const pickable = (() => {
		const occupiedNeighbors = getNeighbors().filter(({ x, y }) => board[x][y] !== 0).length > 0;
		const boardEmpty = board.filter((cols) => cols.filter((val) => val).length).length === 0;
		return !value && (occupiedNeighbors || boardEmpty);
	})();

	return (
		<button
			disabled={!pickable}
			onClick={() => handleSelect(x, y)}
			className={[
				'flex-cc m-1 w-12 h-12 bg-gray-100',
				pickable ? 'cursor-pointer' : 'cursor-not-allowed',
			].join(' ')}
			key={`${x},${y}`}
		>
			{pickable && (
				<p className="text-gray-300">
					{x}, {y}
				</p>
			)}
			{value && (
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

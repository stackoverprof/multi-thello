import React from 'react';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

interface Props {
	value: number;
	x: number;
	y: number;
	disabled: boolean;
}

const TileBoard = ({ value, x, y, disabled }: Props) => {
	const { handleSelect } = useGame();

	return (
		<button
			disabled={disabled}
			onClick={() => handleSelect({ x, y })}
			className={[
				'flex-cc m-1 w-12 h-12 bg-gray-100',
				disabled ? 'cursor-not-allowed' : 'cursor-pointer',
			].join(' ')}
			key={`${x}-${y}`}
		>
			{!disabled && (
				<p className="text-gray-300">
					{x}, {y}
				</p>
			)}
			{Boolean(value) && (
				<div
					className="w-12 h-12 rounded-full"
					style={{ backgroundColor: getColor(value) }}
				></div>
			)}
		</button>
	);
};

export default TileBoard;

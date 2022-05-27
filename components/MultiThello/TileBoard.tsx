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
				'relative flex-cc m-1 w-12 h-12 bg-gray-200 bg-opacity-60',
				disabled ? 'cursor-not-allowed' : 'cursor-pointer',
			].join(' ')}
			key={`${x}-${y}`}
		>
			{value ? (
				<div className="absolute flex-cc">
					<div
						className="w-12 h-12 rounded-full"
						style={{ backgroundColor: getColor(value) }}
					></div>
				</div>
			) : !disabled ? (
				<p className="z-10 font-semibold text-gray-400 pointer-events-none">
					{x}, {y}
				</p>
			) : (
				<></>
			)}
		</button>
	);
};

export default TileBoard;

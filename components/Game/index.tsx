import React, { useEffect } from 'react';
import { getColor } from 'color-seed';
import { useGame } from '@core/redux/selectors/game';

const Game = () => {
	const SIZE = 8;
	const PLAYER = 4;

	const { board, initiateBoard, initiatePlayer, handleSelect } = useGame();

	useEffect(() => {
		initiateBoard(SIZE);
		initiatePlayer(PLAYER);
	}, []);

	return (
		<div className="flex-cc">
			<div
				style={{
					display: 'grid',
					gridTemplateRows: `repeat(${board.length}, minmax(0, 1fr))`,
					gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))`,
				}}
			>
				{board.map((column, i) =>
					column.map((value, j) => (
						<button
							disabled={!!value}
							className={[
								'flex-cc m-1 w-12 h-12 ',
								value ? 'cursor-not-allowed' : 'cursor-pointer',
							].join(' ')}
							style={{
								backgroundColor: value
									? getColor(value * value)
									: 'rgb(243 244 246)',
							}}
							onClick={() => handleSelect(i, j)}
							key={`${i},${j}`}
						>
							{value ? (
								<></>
							) : (
								<p className="text-gray-300">
									{i}, {j}
								</p>
							)}
						</button>
					))
				)}
			</div>
		</div>
	);
};

export default Game;


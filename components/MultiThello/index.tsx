import React from 'react';
import TileBoard from './TileBoard';
import { useGame } from '@core/redux/selectors/game';

const MultiThello = () => {
	const { tileStatus, board } = useGame();

	return (
		<div className="flex-cc p-8 mx-24 bg-white rounded-xl">
			<div className="flex-cc">
				{tileStatus.map((column, x) => (
					<div className="flex-cc col" key={x}>
						{column.map((abled, y) => (
							<TileBoard
								disabled={!abled}
								value={board[x][y]}
								x={x}
								y={y}
								key={`${x}-${y}`}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default MultiThello;

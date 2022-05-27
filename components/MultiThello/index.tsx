import React from 'react';
import TileBoard from './TileBoard';
import { useGame } from '@core/redux/selectors/game';

const MultiThello = () => {
	const { tileStatus, board } = useGame();

	return (
		<div className="flex-cc mx-32">
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

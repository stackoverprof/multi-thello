import React from 'react';
import TileBoard from './TileBoard';
import { useGame } from '@core/redux/selectors/game';

const BoardGame = () => {
	const { tileStatus, board, status } = useGame();

	return (
		<div className="flex-cc p-8 mx-24 my-8 bg-white rounded-xl">
			<div className="flex-cc">
				{tileStatus.map((column, x) => (
					<div className="flex-cc col" key={x}>
						{column.map((abled, y) => (
							<TileBoard
								disabled={!abled || status === 'initial'}
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

export default BoardGame;

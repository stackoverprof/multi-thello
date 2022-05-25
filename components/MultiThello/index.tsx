import React, { useEffect } from 'react';
import TileBoard from './TileBoard';
import { useGame } from '@core/redux/selectors/game';

const MultiThello = () => {
	const SIZE = 8;
	const PLAYER = 4;

	const { board, initiateBoard, initiatePlayer } = useGame();

	useEffect(() => {
		initiateBoard(SIZE);
		initiatePlayer(PLAYER);
	}, []);

	return (
		<div className="flex-cc">
			<div className="flex-cc">
				{board.map((column, x) => (
					<div className="flex-cc col" key={x}>
						{column.map((value, y) => (
							<TileBoard value={value} x={x} y={y} key={`${x}-${y}`} />
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default MultiThello;


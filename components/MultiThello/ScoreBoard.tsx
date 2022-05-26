import React from 'react';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const ScoreBoard = () => {
	const { turn, scores } = useGame();

	return (
		<div className="flex-cs col mt-24">
			<div className="flex-cc mb-8">
				<p
					className="mr-4 text-xl font-semibold"
					style={{
						color: getColor(turn),
					}}
				>
					Current turn:
				</p>
				<div
					className="mr-2 w-4 h-4 rounded-full"
					style={{
						backgroundColor: getColor(turn),
					}}
				></div>
			</div>
			<div className="flex-cc col">
				{scores.map((data, i) => (
					<div
						className="flex-cc my-1 text-xl font-semibold"
						style={{
							color: getColor(data.player),
						}}
						key={i}
					>
						<div
							className="mr-2 w-4 h-4 rounded-full"
							style={{
								backgroundColor: getColor(data.player),
							}}
						></div>
						{data.score}
					</div>
				))}
			</div>
		</div>
	);
};

export default ScoreBoard;


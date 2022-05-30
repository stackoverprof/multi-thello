import React from 'react';
import CountdownTimer from './CountdownTimer';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const ScoreBoard = () => {
	const { turn, scores, status, gameOver } = useGame();

	return (
		<div className={['flex-cs col mt-6'].join(' ')}>
			{
				<div
					className={[
						'flex-cc mb-8',
						(gameOver || status === 'initial') && 'opacity-0',
					].join(' ')}
				>
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
			}
			<CountdownTimer />
			<div className="flex-ss col overflow-y-auto h-[236px]">
				{scores
					.sort((a, b) => b.score - a.score)
					.map((data, i) => (
						<div
							className="flex-sc my-1 w-32 text-xl font-semibold"
							style={{
								color: getColor(data.player),
							}}
							key={i}
						>
							<div
								className="mr-4 w-4 h-4 rounded-full"
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

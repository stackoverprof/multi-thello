import React, { useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const INTERVAL = 30000;

const CountdownTimer = () => {
	const [time, countdown] = useCountDown(INTERVAL);
	const { selected, status, turn, winners, gameOver, executeSelection } = useGame();

	useEffect(() => {
		if (status === 'initial') countdown.pause();
		if (status === 'playing') countdown.start();
	}, [status]);

	useEffect(() => {
		if (status === 'playing') countdown.start();
	}, [turn]);

	useEffect(() => {
		if (status === 'playing' && (time === 0 || selected)) {
			executeSelection();
			countdown.start();
		}
	}, [time, selected]);

	useEffect(() => {
		if (gameOver) countdown.pause();
	}, [gameOver]);

	return (
		<div
			className={[
				'flex-sc mb-8 h-12 w-[220px] font-semibold',
				status !== 'playing' && 'opacity-0',
			].join(' ')}
		>
			{!!time && !gameOver && (
				<p className="flex-cc text-3xl">
					<span className="w-11">{time / 1000}</span>
					<span className="">{time > 1 ? 'seconds' : 'second'} left</span>
				</p>
			)}
			{gameOver && (
				<div className="flex-cs col">
					<p className="mb-2 text-2xl whitespace-nowrap">Winner winner</p>
					<div className="flex-sc">
						<div className="flex-sc gap-2">
							{winners.map((winner, i) => (
								<div
									key={i}
									className="w-8 h-8 rounded-full"
									style={{
										minWidth: 32,
										minHeight: 32,
										backgroundColor: getColor(winner),
									}}
								></div>
							))}
						</div>

						<p className="mt-1 ml-3 text-lg whitespace-nowrap">Chicken dinner</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default CountdownTimer;

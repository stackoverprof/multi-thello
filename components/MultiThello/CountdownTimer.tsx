import React, { useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const INTERVAL = 30000;

const CountdownTimer = () => {
	const [time, countdown] = useCountDown(INTERVAL);
	const { status, turn, winners, gameOver, handleSelect } = useGame();

	const onTimeEnd = () => {
		handleSelect('none');
		countdown.start();
	};

	useEffect(() => {
		if (status === 'initial') countdown.pause();
		if (status === 'playing') countdown.start();
	}, [status]);

	useEffect(() => {
		if (status === 'playing') countdown.start();
	}, [turn]);

	useEffect(() => {
		if (status === 'playing' && time === 0) onTimeEnd();
	}, [time]);

	useEffect(() => {
		if (gameOver) countdown.pause();
	}, [gameOver]);

	return (
		<div className="flex-sc mb-8 h-12 w-[220px] font-semibold">
			{!!time && !gameOver && (
				<p className="flex-cc text-3xl">
					<span className="w-11">{time / 1000}</span>
					<span className="">{time > 1 ? 'seconds' : 'second'} left</span>
				</p>
			)}
			{gameOver && (
				<div className="flex-sc">
					<p className="text-3xl whitespace-nowrap">Congratz to</p>
					<div className="flex-sc mx-2.5 gap-2">
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
				</div>
			)}
		</div>
	);
};

export default CountdownTimer;


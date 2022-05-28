import React, { useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const INTERVAL = 30000;

const CountdownTimer = () => {
	const [time, countdown] = useCountDown(INTERVAL);
	const { status, turn, scores, gameOver, handleSelect } = useGame();

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

	const winner = scores.sort((a, b) => b.score - a.score)[0]?.player;

	return (
		<div className="flex-sc mb-8 h-12 w-[220px] font-semibold">
			{!!time && !gameOver && (
				<p className="flex-cc text-3xl">
					<span className="w-11">{time / 1000}</span>
					<span className="">{time > 1 ? 'seconds' : 'second'} left</span>
				</p>
			)}
			{gameOver && (
				<div className="flex-cc text-3xl whitespace-nowrap">
					Congratz to
					<div
						className="mx-2.5 w-8 h-8 rounded-full"
						style={{
							backgroundColor: getColor(winner),
						}}
					></div>
					!
				</div>
			)}
		</div>
	);
};

export default CountdownTimer;


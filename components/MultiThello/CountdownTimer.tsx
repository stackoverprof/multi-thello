import React, { useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import { useGame } from '@core/redux/selectors/game';

const INTERVAL = 30000;

const CountdownTimer = () => {
	const [time, countdown] = useCountDown(INTERVAL);
	const { status, turn, handleSelect } = useGame();

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

	return (
		<div className="flex-sc mb-8 h-12 w-[220px] font-semibold">
			{!!time && (
				<p className="flex-cc text-3xl">
					<span className="w-11">{time / 1000}</span>
					<span className="">{time > 1 ? 'seconds' : 'second'} left</span>
				</p>
			)}
		</div>
	);
};

export default CountdownTimer;


import React, { useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import { useGame } from '@core/redux/selectors/game';

const INTERVAL = 5000;

const CountdownTimer = () => {
	const [time, countdown] = useCountDown(INTERVAL);
	const { status, turn, handleSelect } = useGame();

	const onTimeEnd = () => {
		handleSelect('none');
		countdown.start();
	};

	useEffect(() => {
		if (status === 'playing') countdown.start();
	}, [status]);

	useEffect(() => {
		if (status === 'playing') countdown.start();
	}, [turn]);

	useEffect(() => {
		if (status === 'playing' && time === 0) onTimeEnd();
	}, [time]);

	return <div className="flex-cc mb-8">{time / 1000}</div>;
};

export default CountdownTimer;


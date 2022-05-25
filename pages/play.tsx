import React from 'react';
import Game from '@components/Game';
import MainLayout from '@components/_layouts/MainLayout';
import { useGame } from '@core/redux/selectors/game';

const Play = () => {
	const { turn } = useGame();
	return (
		<MainLayout title="Play" className="flex-cc col">
			<p className="mb-8 text-xl">Player {turn} turn</p>
			<Game />
		</MainLayout>
	);
};

export default Play;


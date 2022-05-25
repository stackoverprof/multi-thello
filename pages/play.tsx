import React from 'react';
import ConfigForm from '@components/MultiThello/ConfigForm';
import MainLayout from '@components/_layouts/MainLayout';
import MultiThello from '@components/MultiThello';
import { useGame } from '@core/redux/selectors/game';

const Play = () => {
	const { turn } = useGame();

	return (
		<MainLayout title="Play" className="flex-cc col">
			<ConfigForm />
			<p className="mb-8 text-xl">Player {turn} turn</p>
			<MultiThello />
		</MainLayout>
	);
};

export default Play;


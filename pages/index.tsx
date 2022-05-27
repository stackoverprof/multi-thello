import React from 'react';
import ConfigForm from '@components/MultiThello/ConfigForm';
import MainLayout from '@components/_layouts/MainLayout';
import MultiThello from '@components/MultiThello';
import ScoreBoard from '@components/MultiThello/ScoreBoard';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const Play = () => {
	const { turn } = useGame();
	return (
		<MainLayout
			title="Play"
			className="flex-cc py-12 transition duration-500"
			style={{ backgroundColor: `${getColor(turn)}44` }}
		>
			<ConfigForm />
			<MultiThello />
			<ScoreBoard />
		</MainLayout>
	);
};

export default Play;

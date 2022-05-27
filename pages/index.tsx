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
			style={{ backgroundColor: getColor(turn) }}
		>
			<div className="absolute flex-cc bg-black bg-opacity-60 full">
				<ConfigForm />
				<MultiThello />
				<ScoreBoard />
			</div>
		</MainLayout>
	);
};

export default Play;
